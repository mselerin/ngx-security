import { NgModule } from '@angular/core';
import * as Security from './directives/ngx-security.directive';

@NgModule({
  imports: [],
  declarations: [
    Security.BaseSecurityDirective,

    Security.IsAuthenticatedDirective,
    Security.IsAnonymousDirective,

    Security.HasRolesDirective,
    Security.HasNotRolesDirective,
    Security.HasAnyRolesDirective,

    Security.IsMemberOfDirective,
    Security.IsNotMemberOfDirective,
    Security.IsMemberOfAnyDirective,

    Security.HasPermissionsDirective,
    Security.HasNotPermissionsDirective,
    Security.HasAnyPermissionsDirective
  ],
  exports: [
    Security.IsAuthenticatedDirective,
    Security.IsAnonymousDirective,

    Security.HasRolesDirective,
    Security.HasNotRolesDirective,
    Security.HasAnyRolesDirective,

    Security.IsMemberOfDirective,
    Security.IsNotMemberOfDirective,
    Security.IsMemberOfAnyDirective,

    Security.HasPermissionsDirective,
    Security.HasNotPermissionsDirective,
    Security.HasAnyPermissionsDirective
  ]
})
export class NgxSecurityModule { }
