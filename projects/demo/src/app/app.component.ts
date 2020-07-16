import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NgxSecurityService} from 'ngx-security';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private authenticated: boolean = false;
  public foo = { value: 'foo' };

  constructor(
    private security: NgxSecurityService
  ) {}

  ngOnInit() {
    this.security.setPermissionChecker((name: string, resource?: any) => {
      return this.security.isAuthenticated().pipe(
        map(authenticated => authenticated && resource && resource.value === 'foo')
      );
    });

    this.security.setAuthenticated(this.authenticated);
  }


  switchAuthentication() {
    this.authenticated = !this.authenticated;

    this.security.updateState({
      authenticated: this.authenticated,
      roles: ['ADMIN', 'USER'],
      groups: ['GROUP_A', 'GROUP_B']
    });
  }

  toggleFoo() {
    this.foo.value = this.foo.value === 'foo' ? 'bar' : 'foo';
    this.foo = {...this.foo};
  }
}
