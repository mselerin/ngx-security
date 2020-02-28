import { ActivatedRouteSnapshot, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export type CheckerResult = Observable<boolean> | boolean;

export interface NgxSecurityState {
  authenticated: boolean;
  roles: string[];
  groups: string[];
  permissions: string[];

  authenticationChecker: () => CheckerResult;
  rolesChecker: (name: string) => CheckerResult;
  groupsChecker: (name: string) => CheckerResult;
  permissionsChecker: (name: string, resource?: any) => CheckerResult;
}


export interface NgxSecurityGuardOptions {
  authenticated?: boolean;
  roles?: string[];
  groups?: string[];
  permissions?: string[];
  redirectTo?: string;
  authorizedHandler?: (route: Route | ActivatedRouteSnapshot, state?: RouterStateSnapshot) => void;
  unauthorizedHandler?: (route: Route | ActivatedRouteSnapshot, state?: RouterStateSnapshot) => void;
}
