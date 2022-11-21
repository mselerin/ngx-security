import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {NgxSecurityService} from '../services/ngx-security.service';
import {Component} from '@angular/core';
import {NgxSecurityModule} from '../ngx-security.module';
import {of} from 'rxjs';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'secu-test-security',
  template: `<div>TEST</div>`
})
export class TestSecuredComponent {
  public foo = {value: ''};
}



describe('NgxSecurityPipes', () => {
  let security: NgxSecurityService;
  let fixture: ComponentFixture<TestSecuredComponent>;
  let element;


  const createTestComponent = (template: string): ComponentFixture<TestSecuredComponent> => {
    return TestBed
      .overrideComponent(TestSecuredComponent, {set: {template}} )
      .createComponent(TestSecuredComponent);
  };

  const instantiateTest = (input: string, pipe: string, resource?: string) => {
    if (resource) {
      fixture = createTestComponent(`<div id="pipe-test">{{${input} | ${pipe}:${resource} | async }}</div>`);
    } else {
      fixture = createTestComponent(`<div id="pipe-test">{{${input} | ${pipe} | async }}</div>`);
    }
    expect(fixture).toBeDefined();

    element = fixture.nativeElement;
    expect(element).toBeDefined();

    security = TestBed.inject(NgxSecurityService);
    expect(security).toBeDefined();
  };

  const expectAuthorized = (authorized: boolean) => {
    const div = element.querySelector(`#pipe-test`);

    if (authorized) {
      expect(div.textContent).toBe('true');
    } else {
      expect(div.textContent).toBe('false');
    }
  };


  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );

    TestBed.configureTestingModule({
      imports: [NgxSecurityModule],
      declarations: [TestSecuredComponent]
    });
  });

  describe('secuHasRoles', () => {
    beforeEach(() => {
      instantiateTest(`['X', 'Y', 'Z']`, `secuHasRoles`);
    });

    it('should show false if has not roles', fakeAsync(() => {
      security.setRolesChecker(() => of(false));
      fixture.detectChanges();
      expectAuthorized(false);
    }));


    it('should show true if has roles', fakeAsync(() => {
      security.setRolesChecker(() => of(true));
      fixture.detectChanges();
      expectAuthorized(true);
    }));
  });

  describe('secuHasNotRoles', () => {
    beforeEach(() => {
      instantiateTest(`['X', 'Y', 'Z']`, `secuHasNotRoles`);
    });

    it('should show false if has roles', fakeAsync(() => {
      security.setRolesChecker(() => of(true));
      fixture.detectChanges();
      expectAuthorized(false);
    }));


    it('should show true if has not roles', fakeAsync(() => {
      security.setRolesChecker(() => of(false));
      fixture.detectChanges();
      expectAuthorized(true);
    }));
  });

  describe('secuHasAnyRoles', () => {
    beforeEach(() => {
      instantiateTest(`['X', 'Y', 'Z']`, `secuHasAnyRoles`);
    });

    it('should show false if has not any roles', fakeAsync(() => {
      security.setRolesChecker(() => of(false));
      fixture.detectChanges();
      expectAuthorized(false);
    }));


    it('should show true if has any roles', fakeAsync(() => {
      security.setRolesChecker(() => of(true));
      fixture.detectChanges();
      expectAuthorized(true);
    }));
  });

  describe('secuIsMemberOf', () => {
    beforeEach(() => {
      instantiateTest(`['X', 'Y', 'Z']`, `secuIsMemberOf`);
    });

    it('should show false if not member of groups', fakeAsync(() => {
      security.setGroupsChecker(() => of(false));
      fixture.detectChanges();
      expectAuthorized(false);
    }));


    it('should show true if member of groups', fakeAsync(() => {
      security.setGroupsChecker(() => of(true));
      fixture.detectChanges();
      expectAuthorized(true);
    }));
  });

  describe('secuIsNotMemberOf', () => {
    beforeEach(() => {
      instantiateTest(`['X', 'Y', 'Z']`, `secuIsNotMemberOf`);
    });

    it('should show false if member of groups', fakeAsync(() => {
      security.setGroupsChecker(() => of(true));
      fixture.detectChanges();
      expectAuthorized(false);
    }));


    it('should show true if not member of groups', fakeAsync(() => {
      security.setGroupsChecker(() => of(false));
      fixture.detectChanges();
      expectAuthorized(true);
    }));
  });

  describe('secuIsMemberOfAny', () => {
    beforeEach(() => {
      instantiateTest(`['X', 'Y', 'Z']`, `secuIsMemberOfAny`);
    });

    it('should show false if not member of any groups', fakeAsync(() => {
      security.setGroupsChecker(() => of(false));
      fixture.detectChanges();
      expectAuthorized(false);
    }));


    it('should show true if member of any groups', fakeAsync(() => {
      security.setGroupsChecker(() => of(true));
      fixture.detectChanges();
      expectAuthorized(true);
    }));
  });

  describe('secuHasPermissions', () => {
    beforeEach(() => {
      instantiateTest(`['X', 'Y', 'Z']`, `secuHasPermissions`);
    });

    it('should show false if has not permissions', fakeAsync(() => {
      security.setPermissionChecker(() => of(false));
      fixture.detectChanges();
      expectAuthorized(false);
    }));


    it('should show true if has permissions', fakeAsync(() => {
      security.setPermissionChecker(() => of(true));
      fixture.detectChanges();
      expectAuthorized(true);
    }));
  });

  describe('secuHasPermissions with resource', () => {
    beforeEach(() => {
      instantiateTest(`['X', 'Y']`, `secuHasPermissions`, `foo`);
    });

    it('should show true only if the resource is bar', fakeAsync(() => {
      security.setPermissionChecker((perm, resource) => of(resource.value === 'bar'));

      fixture.componentInstance.foo = {value: 'foo'};
      fixture.detectChanges();
      expectAuthorized(false);

      fixture.componentInstance.foo = {value: 'bar'};
      fixture.detectChanges();
      expectAuthorized(true);
    }));
  });

  describe('secuHasNotPermissions', () => {
    beforeEach(() => {
      instantiateTest(`['X', 'Y', 'Z']`, `secuHasNotPermissions`);
    });

    it('should show false if has permissions', fakeAsync(() => {
      security.setPermissionChecker(() => of(true));
      fixture.detectChanges();
      expectAuthorized(false);
    }));


    it('should show true if has not permissions', fakeAsync(() => {
      security.setPermissionChecker(() => of(false));
      fixture.detectChanges();
      expectAuthorized(true);
    }));
  });

  describe('secuHasAnyPermissions', () => {
    beforeEach(() => {
      instantiateTest(`['X', 'Y', 'Z']`, `secuHasAnyPermissions`);
    });

    it('should show false if has not any permissions', fakeAsync(() => {
      security.setPermissionChecker(() => of(false));
      fixture.detectChanges();
      expectAuthorized(false);
    }));


    it('should show true if has any permissions', fakeAsync(() => {
      security.setPermissionChecker(() => of(true));
      fixture.detectChanges();
      expectAuthorized(true);
    }));
  });
});
