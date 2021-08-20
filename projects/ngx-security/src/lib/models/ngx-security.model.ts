import { ActivatedRouteSnapshot, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface NgxSecurityState {
  authenticationChecker: () => Observable<boolean>;
  rolesChecker: (name: string) => Observable<boolean>;
  groupsChecker: (name: string) => Observable<boolean>;
  permissionsChecker: (name: string, resource?: any) => Observable<boolean>;
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
