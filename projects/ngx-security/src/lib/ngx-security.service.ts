import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgxSecurityService
{
  private permissionsSource: BehaviorSubject<any>;
  public permissions$: Observable<any>;

  private readonly INITIAL_STATE: any = {
    authenticated: false,
    roles: []
  };

  private permissionsState: any;

  constructor() {
    this.permissionsSource = new BehaviorSubject<void>(null);
    this.permissions$ = this.permissionsSource.asObservable();
    
    this.permissionsState = this.INITIAL_STATE;
    this.reset();
  }

  public reset(): void {
    this.updateState(this.INITIAL_STATE);
  }

  public setAuthenticated(value: boolean): void {
    this.updateState({ authenticated: value });
  }

  public addRole(role: string): void {
    this.updateState({
      roles: [...this.permissionsState.roles, role]
    });
  }

  public setRoles(roles: string[]): void {
    this.updateState({
      roles: roles || []
    });
  }

  public clearRole(): void {
    this.setRoles([]);
  }


  public isAuthenticated(): boolean {
    return this.permissionsState.authenticated;
  }

  public hasRole(role: string): boolean {
    return this.permissionsState.roles.some((r: string) => r.toUpperCase() === role);
  }


  private updateState(partialState: any): void {
    this.permissionsState = { ...this.permissionsState, ...partialState };
    this.permissionsChanged();
  }

  public permissionsChanged(): void {
    this.permissionsSource.next(this.permissionsState);
  }
}
