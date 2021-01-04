import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { NgxSecurityService } from '../services/ngx-security.service';
import { NgxSecurityGuardOptions } from '../models/ngx-security.model';
import { merge, Observable } from 'rxjs';
import { every, map, take, tap } from 'rxjs/operators';

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

    if (guardOptions.authenticated === true) {
      allObs$.push(this.security.isAuthenticated());
    }
    else if (guardOptions.authenticated === false) {
      allObs$.push(this.security.isAuthenticated().pipe(map(auth => !auth)));
    }

    if (Array.isArray(guardOptions.roles)) {
      let obs$ = guardOptions.roles.map(n => this.security.hasRole(n));
      allObs$.push(...obs$);
    }

    if (Array.isArray(guardOptions.groups)) {
      let obs$ = guardOptions.groups.map(n => this.security.isMemberOf(n));
      allObs$.push(...obs$);
    }

    if (Array.isArray(guardOptions.permissions)) {
      let obs$ = guardOptions.permissions.map(n => this.security.hasPermission(n));
      allObs$.push(...obs$);
    }

    return merge(...allObs$).pipe(
      take(allObs$.length),
      every(r => r)
    );
  }
}
