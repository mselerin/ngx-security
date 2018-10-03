import { TestBed } from '@angular/core/testing';

import { NgxSecurityService } from './ngx-security.service';

describe('NgxSecurityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxSecurityService = TestBed.get(NgxSecurityService);
    expect(service).toBeTruthy();
  });
});
