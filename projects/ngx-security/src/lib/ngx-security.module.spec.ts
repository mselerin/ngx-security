import { NgxSecurityModule } from './ngx-security.module';
import { TestBed } from '@angular/core/testing';
import { NgxSecurityService } from './services/ngx-security.service';

describe('NgxSecurityModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxSecurityModule]
    });
  });

  it('should have an instance of NgxSecurityService', () => {
    let security = TestBed.get(NgxSecurityService);
    expect(security).toBeDefined();
  });
});
