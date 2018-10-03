import { NgModule } from '@angular/core';
import * as Security from './directives/ngx-security.directive';

@NgModule({
  imports: [],
  declarations: [
    Security.BaseSecurityDirective,
    Security.IsAuthenticatedDirective,
    Security.IsAnonymousDirective,
    Security.HasRoleDirective,
    Security.HasNotRoleDirective,
    Security.HasRolesDirective,
    Security.HasAnyRolesDirective,
    Security.IsMemberOfDirective,
    Security.HasPermissionsDirective
  ],
  exports: [
    Security.IsAuthenticatedDirective,
    Security.IsAnonymousDirective,
    Security.HasRoleDirective,
    Security.HasNotRoleDirective,
    Security.HasRolesDirective,
    Security.HasAnyRolesDirective,
    Security.IsMemberOfDirective,
    Security.HasPermissionsDirective
  ]
})
export class NgxSecurityModule { }
