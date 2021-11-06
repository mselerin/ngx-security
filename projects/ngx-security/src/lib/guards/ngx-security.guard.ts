import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {NgxSecurityService} from '../services/ngx-security.service';
import {NgxSecurityGuardOptions} from '../models/ngx-security.model';
import {merge, Observable, of} from 'rxjs';
import {every, map, take, tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgxSecurityGuard implements CanLoad, CanActivate, CanActivateChild
{
  constructor(
    protected readonly security: NgxSecurityService,
    protected readonly router: Router
  ) {}


  canLoad(route: Route): Observable<boolean> { return this.canAccess(route); }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> { return this.canAccess(route, state); }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> { return this.canAccess(route, state); }


  protected canAccess(route: Route | ActivatedRouteSnapshot, state?: RouterStateSnapshot): Observable<boolean> {
    const guardOptions = !!route && route.data ? route.data['security'] as NgxSecurityGuardOptions : {};
    return this.checkAccess(guardOptions).pipe(
      tap(access => {
        if (!access) {
          if (guardOptions.unauthorizedHandler) {
            guardOptions.unauthorizedHandler(route, state);
          }

          if (guardOptions.redirectTo)
            this.router.navigateByUrl(guardOptions.redirectTo);
        }
        else {
          if (guardOptions.authorizedHandler) {
            guardOptions.authorizedHandler(route, state);
          }
        }
      })
    );
  }


  private checkAccess(guardOptions: NgxSecurityGuardOptions): Observable<boolean> {
    let allObs$: Observable<boolean>[] = [];

    if (guardOptions.isAuthenticated === true) {
      allObs$.push(this.security.isAuthenticated());
    }
    else if (guardOptions.isAuthenticated === false) {
      allObs$.push(this.security.isAuthenticated().pipe(map(auth => !auth)));
    }


    if (guardOptions.hasAllRoles) {
      allObs$.push(this.security.hasAllRoles(guardOptions.hasAllRoles));
    }

    if (guardOptions.hasAnyRoles) {
      allObs$.push(this.security.hasAnyRoles(guardOptions.hasAnyRoles));
    }

    if (guardOptions.hasNotRoles) {
      allObs$.push(this.security.hasNotRoles(guardOptions.hasNotRoles));
    }


    if (guardOptions.isMemberOfAll) {
      allObs$.push(this.security.isMemberOfAll(guardOptions.isMemberOfAll));
    }

    if (guardOptions.isMemberOfAny) {
      allObs$.push(this.security.isMemberOfAny(guardOptions.isMemberOfAny));
    }

    if (guardOptions.isMemberOfNone) {
      allObs$.push(this.security.isMemberOfNone(guardOptions.isMemberOfNone));
    }


    if (guardOptions.hasAllPermissions) {
      allObs$.push(this.security.hasAllPermissions(guardOptions.hasAllPermissions));
    }

    if (guardOptions.hasAnyPermissions) {
      allObs$.push(this.security.hasAnyPermissions(guardOptions.hasAnyPermissions));
    }

    if (guardOptions.hasNotPermissions) {
      allObs$.push(this.security.hasNotPermissions(guardOptions.hasNotPermissions));
    }


    return merge(...allObs$).pipe(
      take(allObs$.length),
      every(r => r)
    );
  }
}
