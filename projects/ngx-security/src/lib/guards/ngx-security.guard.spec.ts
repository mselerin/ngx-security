import { inject, TestBed } from '@angular/core/testing';

import { NgxSecurityGuard } from './ngx-security.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('NgxSecurityGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([NgxSecurityGuard], (guard: NgxSecurityGuard) => {
    expect(guard).toBeTruthy();
  }));
});
