import { NgxSecurityService } from 'ngx-security';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  title = 'ngx-security-app';

  constructor(
    private perm: NgxSecurityService
  ) {}

  ngOnInit() {
    
  }

  switchAuthentication() {
    this.perm.setAuthenticated(!this.perm.isAuthenticated());
    this.perm.setRoles(['ADMIN', 'USER']);
  }
}
