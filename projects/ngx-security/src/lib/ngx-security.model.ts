import { ActivatedRouteSnapshot, Route, RouterStateSnapshot } from '@angular/router';

export interface NgxSecurityState {
  authenticated: boolean;
  roles: string[];
  groups: string[];
}


export interface NgxSecurityGuardOptions {
  authenticated?: boolean;
  roles?: string[];
  groups?: string[];
  redirectTo?: string;
  unauthorizedHandler?: (route: Route | ActivatedRouteSnapshot, state?: RouterStateSnapshot) => void;
}
