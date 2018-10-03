import { NgModule } from '@angular/core';
import * as Security from './directives/ngx-security.directive';

@NgModule({
  imports: [],
  declarations: [
    Security.BaseSecurityDirective,
    Security.IsAuthenticatedDirective,
    Security.IsAnonymousDirective,
    Security.HasRolesDirective,
    Security.HasAnyRolesDirective,
    Security.HasNotRolesDirective,
    Security.IsMemberOfDirective,
    Security.IsNotMemberOfDirective,
    Security.HasPermissionsDirective,
    Security.HasNotPermissionsDirective
  ],
  exports: [
    Security.IsAuthenticatedDirective,
    Security.IsAnonymousDirective,
    Security.HasRolesDirective,
    Security.HasAnyRolesDirective,
    Security.HasNotRolesDirective,
    Security.IsMemberOfDirective,
    Security.IsNotMemberOfDirective,
    Security.HasPermissionsDirective,
    Security.HasNotPermissionsDirective
  ]
})
export class NgxSecurityModule { }
