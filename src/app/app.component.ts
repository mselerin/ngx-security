import { NgxSecurityService } from 'ngx-security';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  private authenticated: boolean = false;

  constructor(
    private security: NgxSecurityService
  ) {}

  ngOnInit() {
    this.security.setAuthenticated(this.authenticated);
  }


  switchAuthentication() {
    this.authenticated = !this.authenticated;

    this.security.updateState({
      authenticated: this.authenticated,
      roles: ['ADMIN', 'USER'],
      groups: ['GROUP_A', 'GROUP_B'],
      permissionsChecker: (name: string) => {
        return of(true);
      }
    });
  }
}
