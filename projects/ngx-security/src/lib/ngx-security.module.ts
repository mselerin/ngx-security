import { NgModule } from '@angular/core';
import * as Security from './ngx-security.directive';

@NgModule({
  imports: [],
  declarations: [
    Security.BaseAuthenticatedDirective,
    Security.BaseSecurityDirective,
    Security.IsAuthenticatedDirective,
    Security.IsAnonymousDirective,
    Security.HasRoleDirective,
    Security.HasNotRoleDirective,
    Security.HasRolesDirective,
    Security.HasAnyRolesDirective,
    Security.IsMemberOfDirective
  ],
  exports: [
    Security.IsAuthenticatedDirective,
    Security.IsAnonymousDirective,
    Security.HasRoleDirective,
    Security.HasNotRoleDirective,
    Security.HasRolesDirective,
    Security.HasAnyRolesDirective,
    Security.IsMemberOfDirective
  ]
})
export class NgxSecurityModule { }
