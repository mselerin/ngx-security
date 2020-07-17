import {Component} from '@angular/core';
import {NgxSecurityService} from 'ngx-security';

@Component({
  selector: 'app-sample',
  template: `
    <p>Sample Component <button type="button" (click)="touch()">Touch</button></p>
  `
})
export class SampleComponent {
  constructor(
    private security: NgxSecurityService
  ) {}

  touch() {
    this.security.touch();
  }
}
