import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot, UrlTree
} from '@angular/router';
import {NgxSecurityService} from '../services/ngx-security.service';
import {CurrentRoute, NgxSecurityGuardOptions, RouteUrl} from '../models/ngx-security.model';
import {merge, Observable} from 'rxjs';
import {every, map, take} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgxSecurityGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(
    protected readonly security: NgxSecurityService,
    protected readonly router: Router
  ) {}

  canLoad(route: Route): Observable<boolean | UrlTree> { return this.canAccess(route); }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> { return this.canAccess(route, state); }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> { return this.canAccess(route, state); }

  canAccess(route: CurrentRoute, state?: RouteUrl): Observable<boolean | UrlTree> {
    const guardOptions = !!route && route.data ? route.data['security'] as NgxSecurityGuardOptions : {};
    return this.handle(guardOptions, route, state);
  }

  handle(guardOptions: NgxSecurityGuardOptions, route?: CurrentRoute, state?: RouteUrl): Observable<boolean | UrlTree> {
    return this.checkAccess(guardOptions, route, state).pipe(
      map(access => {
        let returnValue: boolean | UrlTree = access;

        if (!access) {
          if (guardOptions.unauthorizedHandler) {
            guardOptions.unauthorizedHandler(route, state);
          }

          if (guardOptions.redirectTo) {
            returnValue = this.router.parseUrl(guardOptions.redirectTo);
          }
        }
        else {
          if (guardOptions.authorizedHandler) {
            guardOptions.authorizedHandler(route, state);
          }
        }

        return returnValue;
      })
    );
  }


  protected checkAccess(guardOptions: NgxSecurityGuardOptions, route?: CurrentRoute, state?: RouteUrl): Observable<boolean> {
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


    let resource = guardOptions.resource;
    if (guardOptions.resourceResolver) {
      resource = guardOptions.resourceResolver(route, state);
    }

    if (guardOptions.hasAllPermissions) {
      allObs$.push(this.security.hasAllPermissions(guardOptions.hasAllPermissions, resource));
    }

    if (guardOptions.hasAnyPermissions) {
      allObs$.push(this.security.hasAnyPermissions(guardOptions.hasAnyPermissions, resource));
    }

    if (guardOptions.hasNotPermissions) {
      allObs$.push(this.security.hasNotPermissions(guardOptions.hasNotPermissions, resource));
    }


    return merge(...allObs$).pipe(
      take(allObs$.length),
      every(r => r)
    );
  }
}
