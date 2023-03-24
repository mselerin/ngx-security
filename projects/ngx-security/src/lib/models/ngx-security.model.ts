import { ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

export type CurrentRoute = Route | ActivatedRouteSnapshot;
export type RouteUrl = RouterStateSnapshot | UrlSegment[];

export interface NgxSecurityState {
  authenticationChecker: () => Observable<boolean>;
  rolesChecker: (name: string) => Observable<boolean>;
  groupsChecker: (name: string) => Observable<boolean>;
  permissionsChecker: (name: string, resource?: any) => Observable<boolean>;
}


export interface NgxSecurityGuardOptions {
  isAuthenticated?: boolean;

  hasAllRoles?: string | string[];
  hasAnyRoles?: string | string[];
  hasNotRoles?: string | string[];

  isMemberOfAll?: string | string[];
  isMemberOfAny?: string | string[];
  isMemberOfNone?: string | string[];

  hasAllPermissions?: string | string[];
  hasAnyPermissions?: string | string[];
  hasNotPermissions?: string | string[];

  resource?: any;
  resourceResolver?: (route?: CurrentRoute, state?: RouteUrl) => any;

  redirectTo?: string;
  authorizedHandler?: (route?: CurrentRoute, state?: RouteUrl) => void;
  unauthorizedHandler?: (route?: CurrentRoute, state?: RouteUrl) => void;
}
