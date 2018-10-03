import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route, Router,
  RouterStateSnapshot
} from '@angular/router';
import { NgxSecurityService } from '../services/ngx-security.service';
import { NgxSecurityGuardOptions } from '../models/ngx-security.model';

@Injectable({ providedIn: 'root' })
export class NgxSecurityGuard implements CanLoad, CanActivate, CanActivateChild
{
  constructor(
    protected readonly security: NgxSecurityService,
    protected readonly router: Router
  ) {}


  canLoad(route: Route): boolean { return this.canAccess(route); }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { return this.canAccess(route, state); }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { return this.canAccess(route, state); }


  protected canAccess(route: Route | ActivatedRouteSnapshot, state?: RouterStateSnapshot): boolean {
    const guardOptions = !!route && route.data ? route.data['security'] as NgxSecurityGuardOptions : {};
    const access = this.checkAccess(guardOptions);

    if (!access) {
      let path = (state ? state.url : null);
      if (!path && route) {
        path = '/' + (route as Route).path;
      }

      console.warn('Unauthorized access', path);

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

    return access;
  }


  private checkAccess(guardOptions: NgxSecurityGuardOptions): boolean {
    if (guardOptions.authenticated === true && !this.security.isAuthenticated())
      return false;

    if (Array.isArray(guardOptions.roles) && !guardOptions.roles.every(role => this.security.hasRole(role)))
      return false;

    if (Array.isArray(guardOptions.groups) && !guardOptions.groups.every(group => this.security.isMemberOf(group)))
      return false;

    return true;
  }
}
