import {Component, OnInit} from '@angular/core';
import {NgxSecurityService} from 'ngx-security';

@Component({
  selector: 'app-sample',
  template: `
    <p>Sample Component <button type="button" (click)="touch()">Touch</button></p>
  `
})
export class SampleComponent implements OnInit
{
  constructor(
    private security: NgxSecurityService
  ) {}

  ngOnInit() {
    console.log('ngOnInit');
  }

  touch() {
    this.security.touch();
  }
}
