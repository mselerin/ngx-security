import { NgxSecurityService } from 'ngx-security';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  constructor(
    private security: NgxSecurityService
  ) {}

  ngOnInit() {
    
  }

  switchAuthentication() {
    this.security.setAuthenticated(!this.security.isAuthenticated());
    this.security.setRoles(['ADMIN', 'USER']);
    this.security.setGroups(['GROUP_A', 'GROUP_B']);
  }
}
