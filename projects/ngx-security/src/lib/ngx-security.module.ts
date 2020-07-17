import { NgModule } from '@angular/core';
import * as Security from './directives/ngx-security.directive';

const PUBLIC_DIRECTIVES = [
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
];

@NgModule({
  imports: [],
  declarations: [
    Security.BaseSecurityDirective,
    ...PUBLIC_DIRECTIVES
  ],
  exports: PUBLIC_DIRECTIVES
})
export class NgxSecurityModule { }
