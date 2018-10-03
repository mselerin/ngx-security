import { inject, TestBed } from '@angular/core/testing';

import { NgxSecurityGuard } from './ngx-security.guard';

describe('NgxSecurityGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxSecurityGuard]
    });
  });

  it('should ...', inject([NgxSecurityGuard], (guard: NgxSecurityGuard) => {
    expect(guard).toBeTruthy();
  }));
});
