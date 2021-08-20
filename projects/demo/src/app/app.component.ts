import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxSecurityService } from 'ngx-security';
import { SecurityService } from "./security.service";

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
      permissionsChecker: (perm: string, resource?: any) => this.security.hasPermission(perm, resource)
    });
  }


  switchAuthentication() {
    const authenticated = !this.security.authenticated$.value;
    this.security.authenticated$.next(authenticated);

    if (authenticated) {
      this.ngxSecurity.updateState({
        roles: ['ADMIN', 'USER'],
        groups: ['GROUP_A', 'GROUP_B']
      });
    } else {
      this.ngxSecurity.updateState({
        roles: [],
        groups: []
      });
    }
  }

  toggleFoo() {
    this.foo.value = this.foo.value === 'foo' ? 'bar' : 'foo';
    this.foo = {...this.foo};
  }
}
