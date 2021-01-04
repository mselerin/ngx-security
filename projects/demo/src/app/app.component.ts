import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgxSecurityService } from 'ngx-security';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private authenticated$ = new BehaviorSubject<boolean>(false);
  public foo = { value: 'foo' };

  constructor(
    private security: NgxSecurityService
  ) {}

  ngOnInit() {
    this.security.updateState({
      authenticationChecker: () => this.authenticated$,
      permissionsChecker: (perm: string, resource?: any) => {
        return this.security.isAuthenticated().pipe(
          map(authenticated => authenticated && resource && resource.value === 'foo')
        );
      }
    });
  }


  switchAuthentication() {
    const authenticated = !this.authenticated$.value;
    this.authenticated$.next(authenticated);

    if (authenticated) {
      this.security.updateState({
        roles: ['ADMIN', 'USER'],
        groups: ['GROUP_A', 'GROUP_B']
      });
    } else {
      this.security.updateState({
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
