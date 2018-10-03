import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxSecurityState } from '../models/ngx-security.model';

@Injectable({ providedIn: 'root' })
export class NgxSecurityService
{
  private stateSource: BehaviorSubject<NgxSecurityState>;
  public state$: Observable<NgxSecurityState>;

  private readonly INITIAL_STATE: NgxSecurityState = {
    authenticated: false,
    roles: [],
    groups: []
  };

  private securityState: NgxSecurityState;

  constructor() {
    this.stateSource = new BehaviorSubject<NgxSecurityState>(null);
    this.state$ = this.stateSource.asObservable();
    this.reset();
  }

  public reset(): void {
    this.updateState(this.INITIAL_STATE);
  }



  public setAuthenticated(value: boolean): void {
    this.updateState({ authenticated: value });
  }

  public isAuthenticated(): boolean {
    return this.securityState.authenticated;
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

  public hasRole(role: string): boolean {
    return this.securityState.roles.some((r: string) => r.toUpperCase() === role);
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

  public isMemberOf(group: string): boolean {
    return this.securityState.groups.some((g: string) => g.toUpperCase() === group);
  }



  private updateState(partialState: Partial<NgxSecurityState>): void {
    if (!this.securityState)
      this.securityState = { ...this.INITIAL_STATE };

    this.securityState = { ...this.securityState, ...partialState };
    this.stateChanged();
  }

  public stateChanged(): void {
    this.stateSource.next(this.securityState);
  }
}
