import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxSecurityModule } from 'ngx-security';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSecurityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
