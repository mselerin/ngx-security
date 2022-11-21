import { NgxSecurityModule } from './ngx-security.module';
import { TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";
import {NgxSecurityService} from './services/ngx-security.service';

describe('NgxSecurityModule', () => {
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );

    TestBed.configureTestingModule({
      imports: [NgxSecurityModule]
    });
  });

  it('should have an instance of NgxSecurityService', () => {
    let security = TestBed.inject(NgxSecurityService);
    expect(security).toBeDefined();
  });
});
