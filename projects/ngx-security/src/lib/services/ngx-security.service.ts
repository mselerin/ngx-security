import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NgxSecurityState } from '../models/ngx-security.model';


@Injectable({ providedIn: 'root' })
export class NgxSecurityService {
  private readonly stateSource: BehaviorSubject<void>;
  public readonly state$: Observable<void>;

  private readonly INITIAL_STATE: NgxSecurityState = {
    authenticationChecker: () => of(false),
    rolesChecker: () => of(false),
    groupsChecker: () => of(false),
    permissionsChecker: () => of(false)
  };

  private securityState: NgxSecurityState;

  constructor() {
    this.stateSource = new BehaviorSubject<void>(null);
    this.state$ = this.stateSource.asObservable();
    this.reset();
  }

  public reset(): void {
    this.updateState(this.INITIAL_STATE);
  }


  public setAuthenticatedChecker(fn: () => Observable<boolean>): void {
    this.updateState({ authenticationChecker: fn });
  }

  public resetAuthenticatedChecker(): void {
    this.setAuthenticatedChecker(this.INITIAL_STATE.authenticationChecker);
  }

  public setAuthenticated(value: boolean): void {
    this.setAuthenticatedChecker(() => of(value));
  }

  public isAuthenticated(): Observable<boolean> {
    return this.securityState.authenticationChecker ?
      this.securityState.authenticationChecker() : of(false);
  }



  public setRolesChecker(fn: (name: string) => Observable<boolean>): void {
    this.updateState({ rolesChecker: fn });
  }

  public resetRolesChecker(): void {
    this.setRolesChecker(this.INITIAL_STATE.rolesChecker);
  }

  public hasRole(role: string): Observable<boolean> {
    return this.securityState.rolesChecker ?
      this.securityState.rolesChecker(role) : of(false);
  }




  public setGroupsChecker(fn: (name: string) => Observable<boolean>): void {
    this.updateState({ groupsChecker: fn });
  }

  public resetGroupsChecker(): void {
    this.setGroupsChecker(this.INITIAL_STATE.groupsChecker);
  }

  public isMemberOf(group: string): Observable<boolean> {
    return this.securityState.groupsChecker ?
      this.securityState.groupsChecker(group) : of(false);
  }



  public setPermissionChecker(fn: (name: string, resource?: any) => Observable<boolean>): void {
    this.updateState({ permissionsChecker: fn });
  }

  public resetPermissionChecker(): void {
    this.setPermissionChecker(this.INITIAL_STATE.permissionsChecker);
  }

  public hasPermission(name: string, resource?: any): Observable<boolean> {
    return this.securityState.permissionsChecker ?
      this.securityState.permissionsChecker(name, resource) : of(false);
  }



  public updateState(partialState: Partial<NgxSecurityState>): void {
    if (!this.securityState) {
      this.securityState = {...this.INITIAL_STATE};
    }

    this.securityState = { ...this.securityState, ...partialState };
    this.touch();
  }


  public touch(): void {
    this.stateSource.next(null);
  }
}
