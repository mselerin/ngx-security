import { Component, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NgxSecurityGuard } from './ngx-security.guard';
import { NgxSecurityModule } from '../ngx-security.module';
import { NgxSecurityService } from '../services/ngx-security.service';
import { of } from 'rxjs';


@Component({
  selector: 'test-security',
  template: `<div>TEST</div>`
})
export class TestSecuredComponent {}

@NgModule({
  declarations: [ TestSecuredComponent ],
  exports: [ TestSecuredComponent ]
})
export class TestSecuredModule {}


let AUTH_HANDLER = false;
let UNAUTH_HANDLER = false;


export const routes: Routes = [
  {
    path: 'access-denied',
    component: TestSecuredComponent
  },

  {
    path: 'unsecured',
    component: TestSecuredComponent
  },

  {
    path: 'secured',
    canActivate: [ NgxSecurityGuard ],
    data: {
      security: {
        authenticated: true,
        roles: ['X'],
        groups: ['Y'],
        permissions: ['Z'],
        redirectTo: '/access-denied',
        authorizedHandler: () => {
          AUTH_HANDLER = true;
        },
        unauthorizedHandler: () => {
          UNAUTH_HANDLER = true;
        }
      }
    },
    component: TestSecuredComponent
  }
];

@NgModule({
  imports: [
    TestSecuredModule,
    RouterTestingModule.withRoutes(routes)
  ]
})
export class TestSecuredRouterModule {}


describe('NgxSecurityGuard', () => {
  let router: Router;
  let location: Location;
  let component: TestSecuredComponent;
  let fixture: ComponentFixture<TestSecuredComponent>;
  let security: NgxSecurityService;

  beforeEach(() => {
    AUTH_HANDLER = false;
    UNAUTH_HANDLER = false;

    TestBed.configureTestingModule({
      imports: [ NgxSecurityModule, TestSecuredRouterModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });


  beforeEach(() => {
    security = TestBed.get(NgxSecurityService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(TestSecuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should ...', inject([NgxSecurityGuard], (guard: NgxSecurityGuard) => {
    expect(guard).toBeTruthy();
  }));


  it('when /unsecured should navigate to /unsecured', fakeAsync(() => {
    router.navigate(['unsecured']);
    tick();

    expect(location.path()).toBe('/unsecured');
  }));


  it('when /secured and no security should navigate to /access-denied', fakeAsync(() => {
    router.navigate(['secured']);
    tick();

    expect(location.path()).toBe('/access-denied');
    expect(AUTH_HANDLER).toBeFalsy();
    expect(UNAUTH_HANDLER).toBeTruthy();
  }));


  it('when /secured and full security should navigate to /secured', fakeAsync(() => {
    security.setAuthenticated(true);
    security.setRolesChecker(() => of(true));
    security.setGroupsChecker(() => of(true));
    security.setPermissionChecker(() => of(true));

    router.navigate(['secured']);
    tick();

    expect(location.path()).toBe('/secured');
    expect(AUTH_HANDLER).toBeTruthy();
    expect(UNAUTH_HANDLER).toBeFalsy();
  }));
});
