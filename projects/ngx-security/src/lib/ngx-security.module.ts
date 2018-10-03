import { NgModule } from '@angular/core';
import {
  BaseAuthenticatedDirective,
  BaseSecurityDirective,
  IsAuthenticatedDirective,
  IsAnonymousDirective,
  HasRoleDirective,
  HasNotRoleDirective,
  HasRolesDirective,
  HasAnyRolesDirective
} from './ngx-security.directive';

@NgModule({
  imports: [],
  declarations: [
    BaseAuthenticatedDirective,
    BaseSecurityDirective,
    IsAuthenticatedDirective,
    IsAnonymousDirective,
    HasRoleDirective,
    HasNotRoleDirective,
    HasRolesDirective,
    HasAnyRolesDirective
  ],
  exports: [
    IsAuthenticatedDirective,
    IsAnonymousDirective,
    HasRoleDirective,
    HasNotRoleDirective,
    HasRolesDirective,
    HasAnyRolesDirective
  ]
})
export class NgxSecurityModule { }
