import { fakeAsync, tick } from '@angular/core/testing';

import { NgxSecurityService } from './ngx-security.service';
import { of } from 'rxjs';

describe('NgxSecurityService', () => {
  let security: NgxSecurityService;

  beforeEach(() => {
    security = new NgxSecurityService();
  });


  it('should be created', () => {
    expect(security).toBeTruthy();
  });


  it('should be false after reset', fakeAsync(() => {
    security.setAuthenticatedChecker(() => of(true));
    security.setRolesChecker(() => of(true));
    security.setGroupsChecker(() => of(true));
    security.setPermissionChecker(() => of(true));

    security.isAuthenticated().subscribe(d => expect(d).toBeTruthy());
    tick();

    security.reset();

    security.isAuthenticated().subscribe(d => expect(d).toBeFalsy());
    security.hasRole('X').subscribe(d => expect(d).toBeFalsy());
    security.isMemberOf('Y').subscribe(d => expect(d).toBeFalsy());
    security.hasPermission('Z').subscribe(d => expect(d).toBeFalsy());
  }));


  it('when clear should be reset', fakeAsync(() => {
    security.setRolesChecker(() => of(true));
    security.setGroupsChecker(() => of(true));
    security.setPermissionChecker(() => of(true));

    security.resetRolesChecker();
    security.resetGroupsChecker();
    security.resetPermissionChecker();

    security.hasRole('X').subscribe(d => expect(d).toBeFalsy());
    security.isMemberOf('Y').subscribe(d => expect(d).toBeFalsy());
    security.hasPermission('Z').subscribe(d => expect(d).toBeFalsy());
  }));


  it('when setAuthenticated then isAuthenticated should return correct value', () => {
    security.setAuthenticated(true);
    security.isAuthenticated().subscribe(d => expect(d).toBeTruthy());
  });


  it('when setAuthenticatedChecker then isAuthenticated should return correct value', fakeAsync(() => {
    security.reset();
    security.setAuthenticatedChecker(() => of(false));
    security.isAuthenticated().subscribe(d => expect(d).toBeFalsy());
    tick();

    security.reset();
    security.setAuthenticatedChecker(() => of(true));
    security.isAuthenticated().subscribe(d => expect(d).toBeTruthy());
    tick();
  }));




  it('with rolesChecker then hasRole should return correct value', fakeAsync(() => {
    security.setRolesChecker(() => of(false));
    security.hasRole('X').subscribe(d => expect(d).toBeFalsy());
    tick();

    security.reset();
    security.setRolesChecker(() => of(true));
    security.hasRole('X').subscribe(d => expect(d).toBeTruthy());
    tick();
  }));




  it('with groupsChecker then isMemberOf should return correct value', fakeAsync(() => {
    security.setGroupsChecker(() => of(false));
    security.isMemberOf('X').subscribe(d => expect(d).toBeFalsy());
    tick();

    security.reset();
    security.setGroupsChecker(() => of(true));
    security.isMemberOf('X').subscribe(d => expect(d).toBeTruthy());
    tick();
  }));




  it('with permissionChecker then hasPermission should return correct value', fakeAsync(() => {
    security.setPermissionChecker(() => of(false));
    security.hasPermission('X').subscribe(d => expect(d).toBeFalsy());
    tick();

    security.reset();
    security.setPermissionChecker(() => of(true));
    security.hasPermission('X', {foo: 'bar'}).subscribe(d => expect(d).toBeTruthy());
    tick();
  }));
});
