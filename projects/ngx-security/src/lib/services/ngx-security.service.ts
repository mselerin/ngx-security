import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CheckerResult, NgxSecurityState } from '../models/ngx-security.model';


export function asObservable(obs: CheckerResult): Observable<boolean> {
  if (obs instanceof Observable)
    return obs;

  return of(obs);
}


@Injectable({ providedIn: 'root' })
export class NgxSecurityService {
  private readonly stateSource: BehaviorSubject<void>;
  public readonly state$: Observable<void>;

  private readonly INITIAL_STATE: NgxSecurityState = {
    authenticated: false,

    roles: [],
    groups: [],
    permissions: [],

    authenticationChecker: null,
    rolesChecker: null,
    groupsChecker: null,
    permissionsChecker: null
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


  public setAuthenticatedChecker(fn: () => CheckerResult): void {
    this.updateState({ authenticationChecker: fn });
  }

  public setAuthenticated(value: boolean): void {
    this.updateState({ authenticated: value });
  }

  public isAuthenticated(): Observable<boolean> {
    // Check inside state
    const check = this.securityState.authenticated;
    if (check)
      return of(check);

    // Check with callback
    if (this.securityState.authenticationChecker)
      return asObservable(this.securityState.authenticationChecker());

    // Default
    return of(false);
  }



  public setRolesChecker(fn: (name: string) => CheckerResult): void {
    this.updateState({ rolesChecker: fn });
  }

  public addRole(role: string): void {
    this.updateState({ roles: [...this.securityState.roles, role] });
  }

  public setRoles(roles: string[]): void {
    this.updateState({ roles: roles || [] });
  }

  public clearRoles(): void {
    this.setRoles([]);
  }

  public hasRole(role: string): Observable<boolean> {
    // Check inside state
    const check = this.securityState.roles.some((r: string) => r.toUpperCase() === role.toUpperCase());
    if (check) {
      return of(check);
    }

    // Check with callback
    if (this.securityState.rolesChecker) {
      return asObservable(this.securityState.rolesChecker(role));
    }

    // Default
    return of(false);
  }




  public setGroupsChecker(fn: (name: string) => CheckerResult): void {
    this.updateState({ groupsChecker: fn });
  }

  public addGroup(group: string): void {
    this.updateState({ groups: [...this.securityState.groups, group] });
  }

  public setGroups(groups: string[]): void {
    this.updateState({ groups: groups || [] });
  }

  public clearGroups(): void {
    this.setGroups([]);
  }

  public isMemberOf(group: string): Observable<boolean> {
    // Check inside state
    const check = this.securityState.groups.some((r: string) => r.toUpperCase() === group.toUpperCase());
    if (check) {
      return of(check);
    }

    // Check with callback
    if (this.securityState.groupsChecker) {
      return asObservable(this.securityState.groupsChecker(group));
    }

    // Default
    return of(false);
  }




  public setPermissionChecker(fn: (name: string, resource?: any) => CheckerResult): void {
    this.updateState({ permissionsChecker: fn });
  }

  public addPermission(role: string): void {
    this.updateState({ permissions: [...this.securityState.permissions, role] });
  }

  public setPermissions(permissions: string[]): void {
    this.updateState({ permissions: permissions || [] });
  }

  public clearPermissions(): void {
    this.setPermissions([]);
  }

  public hasPermission(name: string, resource?: any): Observable<boolean> {
    // Check inside state
    const check = this.securityState.permissions.some((r: string) => r.toUpperCase() === name.toUpperCase());
    if (check)
      return of(check);

    // Check with callback
    if (this.securityState.permissionsChecker)
      return asObservable(this.securityState.permissionsChecker(name, resource));

    // Default
    return of(false);
  }



  public updateState(partialState: Partial<NgxSecurityState>): void {
    if (!this.securityState)
      this.securityState = { ...this.INITIAL_STATE };

    this.securityState = { ...this.securityState, ...partialState };
    this.touch();
  }


  public touch(): void {
    this.stateSource.next(null);
  }
}
