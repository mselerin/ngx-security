import {async, fakeAsync, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NgxSecurityModule} from 'ngx-security';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";

describe('AppComponent', () => {
  beforeEach(fakeAsync(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ NgxSecurityModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
    }).compileComponents();
  }));

  it('should create the app', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('ngx-security demo');
  }));
});
