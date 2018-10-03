import { IsAuthenticatedDirective } from './ngx-security.directive';
import { TestBed } from '@angular/core/testing';
import { NgxSecurityService } from './ngx-security.service';

describe('NgxSecurityDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should create an instance', () => {
    const security = TestBed.get(NgxSecurityService);
    const directive = new IsAuthenticatedDirective(security, null, null);
    expect(directive).toBeTruthy();
  });
});
