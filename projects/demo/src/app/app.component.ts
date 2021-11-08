import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NgxSecurityService} from 'ngx-security';
import {SecurityService} from "./security.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public foo = { value: 'foo' };

  constructor(
    private ngxSecurity: NgxSecurityService,
    private security: SecurityService
  ) {}

  ngOnInit() {
    this.ngxSecurity.updateState({
      authenticationChecker: () => this.security.isAuthenticated(),
      groupsChecker: (group: string) => this.security.isMemberOf(group),
      rolesChecker: (role: string) => this.security.hasRole(role),
      permissionsChecker: (perm: string, resource?: any) => this.security.hasPermission(perm, resource)
    });
  }

  switchAuthentication(): void {
    this.security.switchAuthentication();
    this.ngxSecurity.touch();
  }

  toggleFoo(): void {
    this.foo.value = this.foo.value === 'foo' ? 'bar' : 'foo';
    this.foo = {...this.foo};
  }
}
