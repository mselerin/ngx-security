import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NgxSecurityService } from './ngx-security.service';
import { NgxSecurityModule } from '../ngx-security.module';
import { of } from 'rxjs';

describe('NgxSecurityService', () => {
  let security: NgxSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxSecurityModule]
    });

    security = TestBed.get(NgxSecurityService);
  });

  it('should be created', () => {
    expect(security).toBeTruthy();
  });

  it('should be false after reset', fakeAsync(() => {
    security.setAuthenticatedChecker(() => of(true));
    security.setRolesChecker(() => of(true));
    security.setGroupsChecker(() => of(true));
    security.setPermissionChecker(() => of(true));

    security.reset();

    security.isAuthenticated().subscribe(d => expect(d).toBeFalsy());
    security.hasRole('X').subscribe(d => expect(d).toBeFalsy());
    security.isMemberOf('Y').subscribe(d => expect(d).toBeFalsy());
    security.hasPermission('Z').subscribe(d => expect(d).toBeFalsy());
  }));


  it('when clear should be reset', fakeAsync(() => {
    security.addRole('X');
    security.addGroup('Y');
    security.addPermission('Z');

    security.clearRoles();
    security.clearGroups();
    security.clearPermissions();

    security.hasRole('X').subscribe(d => expect(d).toBeFalsy());
    security.isMemberOf('Y').subscribe(d => expect(d).toBeFalsy());
    security.hasPermission('Z').subscribe(d => expect(d).toBeFalsy());
  }));


  it('when setAuthenticated then isAuthenticated should return correct value', () => {
    security.setAuthenticated(true);
    security.isAuthenticated().subscribe(d => expect(d).toBeTruthy());
  });


  it('when setAuthenticatedChecker then isAuthenticated should return correct value', fakeAsync(() => {
    security.setAuthenticatedChecker(() => of(false));
    security.isAuthenticated().subscribe(d => expect(d).toBeFalsy());
    tick();

    security.setAuthenticatedChecker(() => of(true));
    security.isAuthenticated().subscribe(d => expect(d).toBeTruthy());
    tick();

    security.setAuthenticated(false);
    security.isAuthenticated().subscribe(d => expect(d).toBeTruthy());
    tick();
  }));




  it('with rolesChecker then hasRole should return correct value', fakeAsync(() => {
    security.setRolesChecker(() => of(false));
    security.hasRole('X').subscribe(d => expect(d).toBeFalsy());
    tick();

    security.setRolesChecker(() => of(true));
    security.hasRole('X').subscribe(d => expect(d).toBeTruthy());
    tick();

    security.addRole('Y');
    security.hasRole('Y').subscribe(d => expect(d).toBeTruthy());
    tick();
  }));




  it('with groupsChecker then isMemberOf should return correct value', fakeAsync(() => {
    security.setGroupsChecker(() => of(false));
    security.isMemberOf('X').subscribe(d => expect(d).toBeFalsy());
    tick();

    security.setGroupsChecker(() => of(true));
    security.isMemberOf('X').subscribe(d => expect(d).toBeTruthy());
    tick();

    security.addGroup('Y');
    security.isMemberOf('Y').subscribe(d => expect(d).toBeTruthy());
    tick();
  }));




  it('with permissionChecker then hasPermission should return correct value', fakeAsync(() => {
    security.setPermissionChecker(() => of(false));
    security.hasPermission('X').subscribe(d => expect(d).toBeFalsy());
    tick();

    security.setPermissionChecker(() => of(true));
    security.hasPermission('X').subscribe(d => expect(d).toBeTruthy());
    tick();

    security.addPermission('Y');
    security.hasPermission('Y').subscribe(d => expect(d).toBeTruthy());
    tick();
  }));
});
