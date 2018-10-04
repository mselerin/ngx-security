import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgxSecurityService } from '../services/ngx-security.service';
import { Component } from '@angular/core';
import { NgxSecurityModule } from '../ngx-security.module';

@Component({
  selector: 'test-security',
  template: `<div>TEST</div>`
})
export class TestSecuredComponent {}



describe('NgxSecurityDirectives', () => {
  let security;
  let fixture;
  let element;


  const createTestComponent = (template: string): ComponentFixture<TestSecuredComponent> => {
    return TestBed
      .overrideComponent(TestSecuredComponent, {set: {template: template}} )
      .createComponent(TestSecuredComponent);
  };

  const instantiateTest = (directive: string) => {
    fixture = createTestComponent(`<div id="OK" ${directive}>OK</div><ng-template #elseTpl><div id="ELSE">ELSE</div></ng-template>`);
    expect(fixture).toBeDefined();

    element = fixture.nativeElement;
    expect(element).toBeDefined();

    security = TestBed.get(NgxSecurityService);
    expect(security).toBeDefined();
  };

  const expectVisibility = (okVisible: boolean, elseVisible?: boolean) => {
    let okDiv = element.querySelector(`#OK`);
    let elseDiv = element.querySelector(`#ELSE`);

    okVisible ? expectVisible(okDiv) : expectHidden(okDiv);

    if (elseVisible !== undefined)
      elseVisible ? expectVisible(elseDiv) : expectHidden(elseDiv);
  };


  const expectVisible = (div: any) => {
    expect(div).not.toBeNull();
    expect(div.textContent).not.toBeNull();
    expect(div.textContent.length).toBeGreaterThan(0);
  };

  const expectHidden = (div: any) => {
    expect(div).toBeNull();
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxSecurityModule],
      declarations: [TestSecuredComponent]
    });
  });



  describe('secuIsAuthenticated', () => {
    beforeEach(() => {
      instantiateTest(`*secuIsAuthenticated`);
    });

    it('should not show the element if not authenticated', fakeAsync(() => {
      security.setAuthenticated(false);
      fixture.detectChanges();
      expectVisibility(false);
    }));


    it('should show the element if authenticated', fakeAsync(() => {
      security.setAuthenticated(true);
      fixture.detectChanges();
      expectVisibility(true);
    }));


    it('should show/hide the element when switching authenticated', fakeAsync(() => {
      security.setAuthenticated(true);
      fixture.detectChanges();
      expectVisibility(true);

      security.setAuthenticated(false);
      fixture.detectChanges();
      expectVisibility(false);
    }));
  });



  describe('secuIsAnonymous', () => {
    beforeEach(() => {
      instantiateTest(`*secuIsAnonymous`);
    });

    it('should not show the element if not anonymous', fakeAsync(() => {
      security.setAuthenticated(true);
      fixture.detectChanges();
      expectVisibility(false);
    }));


    it('should show the element if anonymous', fakeAsync(() => {
      security.setAuthenticated(false);
      fixture.detectChanges();
      expectVisibility(true);
    }));
  });




  describe('secuHasRoles', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasRoles="['X', 'Y', 'Z']"`);
    });

    it('should not show the element if has not roles', fakeAsync(() => {
      security.setRoles(['X']);
      fixture.detectChanges();
      expectVisibility(false);
    }));


    it('should show the element if has roles', fakeAsync(() => {
      security.setRoles(['X', 'Y', 'Z']);
      fixture.detectChanges();
      expectVisibility(true);
    }));
  });


  describe('secuHasRoles with else template', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasRoles="'X'; else elseTpl"`);
    });

    it('should show/hide the elseTpl', fakeAsync(() => {
      security.setRoles(['A']);
      fixture.detectChanges();
      expectVisibility(false, true);

      security.setRoles(['X', 'Y', 'Z']);
      fixture.detectChanges();
      expectVisibility(true, false);
    }));
  });



  describe('secuHasNotRoles', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasNotRoles="['X', 'Y', 'Z']"`);
    });

    it('should not show the element if has roles', fakeAsync(() => {
      security.setRoles(['X']);
      fixture.detectChanges();
      expectVisibility(false);
    }));


    it('should show the element if has not roles', fakeAsync(() => {
      security.setRoles(['A', 'B', 'C']);
      fixture.detectChanges();
      expectVisibility(true);
    }));
  });


  describe('secuHasNotRoles with else template', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasNotRoles="'X'; else elseTpl"`);
    });

    it('should show/hide the elseTpl', fakeAsync(() => {
      security.setRoles(['X']);
      fixture.detectChanges();
      expectVisibility(false, true);

      security.setRoles(['A', 'B', 'C']);
      fixture.detectChanges();
      expectVisibility(true, false);
    }));
  });



  describe('secuHasAnyRoles', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasAnyRoles="['X', 'Y', 'Z']"`);
    });

    it('should not show the element if has not any roles', fakeAsync(() => {
      security.setRoles(['A']);
      fixture.detectChanges();
      expectVisibility(false);
    }));


    it('should show the element if has any roles', fakeAsync(() => {
      security.setRoles(['X']);
      fixture.detectChanges();
      expectVisibility(true);
    }));
  });


  describe('secuHasAnyRoles with else template', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasAnyRoles="'X'; else elseTpl"`);
    });

    it('should show/hide the elseTpl', fakeAsync(() => {
      security.setRoles(['A']);
      fixture.detectChanges();
      expectVisibility(false, true);

      security.setRoles(['X']);
      fixture.detectChanges();
      expectVisibility(true, false);
    }));
  });








  describe('secuIsMemberOf', () => {
    beforeEach(() => {
      instantiateTest(`*secuIsMemberOf="['X', 'Y', 'Z']"`);
    });

    it('should not show the element if not member of groups', fakeAsync(() => {
      security.setGroups(['X']);
      fixture.detectChanges();
      expectVisibility(false);
    }));


    it('should show the element if member of groups', fakeAsync(() => {
      security.setGroups(['X', 'Y', 'Z']);
      fixture.detectChanges();
      expectVisibility(true);
    }));
  });


  describe('secuIsMemberOf with else template', () => {
    beforeEach(() => {
      instantiateTest(`*secuIsMemberOf="'X'; else elseTpl"`);
    });

    it('should show/hide the elseTpl', fakeAsync(() => {
      security.setGroups(['A']);
      fixture.detectChanges();
      expectVisibility(false, true);

      security.setGroups(['X']);
      fixture.detectChanges();
      expectVisibility(true, false);
    }));
  });



  describe('secuIsNotMemberOf', () => {
    beforeEach(() => {
      instantiateTest(`*secuIsNotMemberOf="['X', 'Y', 'Z']"`);
    });

    it('should not show the element if member of groups', fakeAsync(() => {
      security.setGroups(['X']);
      fixture.detectChanges();
      expectVisibility(false);
    }));


    it('should show the element if not member of groups', fakeAsync(() => {
      security.setGroups(['A', 'B', 'C']);
      fixture.detectChanges();
      expectVisibility(true);
    }));
  });


  describe('secuIsNotMemberOf with else template', () => {
    beforeEach(() => {
      instantiateTest(`*secuIsNotMemberOf="'X'; else elseTpl"`);
    });

    it('should show/hide the elseTpl', fakeAsync(() => {
      security.setGroups(['X']);
      fixture.detectChanges();
      expectVisibility(false, true);

      security.setGroups(['A']);
      fixture.detectChanges();
      expectVisibility(true, false);
    }));
  });



  describe('secuIsMemberOfAny', () => {
    beforeEach(() => {
      instantiateTest(`*secuIsMemberOfAny="['X', 'Y', 'Z']"`);
    });

    it('should not show the element if not member of any groups', fakeAsync(() => {
      security.setGroups(['A']);
      fixture.detectChanges();
      expectVisibility(false);
    }));


    it('should show the element if member of any groups', fakeAsync(() => {
      security.setGroups(['X']);
      fixture.detectChanges();
      expectVisibility(true);
    }));
  });


  describe('secuIsMemberOfAny with else template', () => {
    beforeEach(() => {
      instantiateTest(`*secuIsMemberOfAny="'X'; else elseTpl"`);
    });

    it('should show/hide the elseTpl', fakeAsync(() => {
      security.setGroups(['A']);
      fixture.detectChanges();
      expectVisibility(false, true);

      security.setGroups(['X']);
      fixture.detectChanges();
      expectVisibility(true, false);
    }));
  });




  describe('secuHasPermissions', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasPermissions="['X', 'Y', 'Z']; else elseTpl"`);
    });

    it('should not show the element if has not permissions', fakeAsync(() => {
      security.setPermissions(['X']);
      fixture.detectChanges();
      expectVisibility(false);
    }));


    it('should show the element if has permissions', fakeAsync(() => {
      security.setPermissions(['X', 'Y', 'Z']);
      fixture.detectChanges();
      expectVisibility(true);
    }));
  });


  describe('secuHasPermissions with else template', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasPermissions="'X'; else elseTpl"`);
    });

    it('should show/hide the elseTpl', fakeAsync(() => {
      security.setPermissions(['A']);
      fixture.detectChanges();
      expectVisibility(false, true);

      security.setPermissions(['X']);
      fixture.detectChanges();
      expectVisibility(true, false);
    }));
  });



  describe('secuHasNotPermissions', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasNotPermissions="['X', 'Y', 'Z']"`);
    });

    it('should not show the element if has permissions', fakeAsync(() => {
      security.setPermissions(['X']);
      fixture.detectChanges();
      expectVisibility(false);
    }));


    it('should show the element if has not permissions', fakeAsync(() => {
      security.setPermissions(['A', 'B', 'C']);
      fixture.detectChanges();
      expectVisibility(true);
    }));
  });


  describe('secuHasNotPermissions with else template', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasNotPermissions="'X'; else elseTpl"`);
    });

    it('should show/hide the elseTpl', fakeAsync(() => {
      security.setPermissions(['X']);
      fixture.detectChanges();
      expectVisibility(false, true);

      security.setPermissions(['A']);
      fixture.detectChanges();
      expectVisibility(true, false);
    }));
  });



  describe('secuHasAnyPermissions', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasAnyPermissions="['X', 'Y', 'Z']"`);
    });

    it('should not show the element if has not any permissions', fakeAsync(() => {
      security.setPermissions(['A']);
      fixture.detectChanges();
      expectVisibility(false);
    }));


    it('should show the element if has any permissions', fakeAsync(() => {
      security.setPermissions(['X']);
      fixture.detectChanges();
      expectVisibility(true);
    }));
  });


  describe('secuHasAnyPermissions with else template', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasAnyPermissions="'X'; else elseTpl"`);
    });

    it('should show/hide the elseTpl', fakeAsync(() => {
      security.setPermissions(['A']);
      fixture.detectChanges();
      expectVisibility(false, true);

      security.setPermissions(['X']);
      fixture.detectChanges();
      expectVisibility(true, false);
    }));
  });



  describe('when no input and every items', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasRoles`);
    });

    it('should not show the element', fakeAsync(() => {
      security.setRoles(['X']);
      fixture.detectChanges();
      expectVisibility(false);
    }));
  });


  describe('when no input and first items', () => {
    beforeEach(() => {
      instantiateTest(`*secuHasAnyRoles`);
    });

    it('should not show the element', fakeAsync(() => {
      security.setRoles(['X']);
      fixture.detectChanges();
      expectVisibility(false);
    }));
  });


});
