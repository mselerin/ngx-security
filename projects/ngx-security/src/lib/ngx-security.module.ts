import {NgModule} from '@angular/core';
import * as SecurityDirectives from './directives/ngx-security.directive';
import * as SecurityPipes from './pipes/ngx-security.pipe';

const PUBLIC_DIRECTIVES = [
  SecurityDirectives.IsAuthenticatedDirective,
  SecurityDirectives.IsAnonymousDirective,

  SecurityDirectives.HasRolesDirective,
  SecurityDirectives.HasNotRolesDirective,
  SecurityDirectives.HasAnyRolesDirective,

  SecurityDirectives.IsMemberOfDirective,
  SecurityDirectives.IsNotMemberOfDirective,
  SecurityDirectives.IsMemberOfAnyDirective,

  SecurityDirectives.HasPermissionsDirective,
  SecurityDirectives.HasNotPermissionsDirective,
  SecurityDirectives.HasAnyPermissionsDirective
];

const PUBLIC_PIPES = [
  SecurityPipes.HasRolesPipe,
  SecurityPipes.HasNotRolesPipe,
  SecurityPipes.HasAnyRolesPipe,

  SecurityPipes.IsMemberOfPipe,
  SecurityPipes.IsNotMemberOfPipe,
  SecurityPipes.IsMemberOfAnyPipe,

  SecurityPipes.HasPermissionsPipe,
  SecurityPipes.HasNotPermissionsPipe,
  SecurityPipes.HasAnyPermissionsPipe
];

@NgModule({
  imports: [],
  declarations: [
    SecurityDirectives.BaseSecurityDirective,
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES
  ],
  exports: [
    ...PUBLIC_DIRECTIVES,
    ...PUBLIC_PIPES
  ]
})
export class NgxSecurityModule { }
