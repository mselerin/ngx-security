import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

const AUTH_GROUPS = ['GROUP_A', 'GROUP_B'];
const AUTH_ROLES = ['ADMIN', 'USER'];

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  public authenticated$ = new BehaviorSubject<boolean>(false);

  public isAuthenticated(): Observable<boolean> {
    return this.authenticated$;
  }

  public switchAuthentication(): void {
    const authenticated = !this.authenticated$.value;
    this.authenticated$.next(authenticated);
  }

  public isMemberOf(group: string): Observable<boolean> {
    if (this.authenticated$.value) {
      return of(AUTH_GROUPS.includes(group));
    }

    return of(false);
  }

  public hasRole(role: string): Observable<boolean> {
    if (this.authenticated$.value) {
      return of(AUTH_ROLES.includes(role));
    }

    return of(false);
  }

  public hasPermission(perm: string, resource?: any): Observable<boolean> {
    console.log("hasPermission", perm, resource);
    return this.isAuthenticated().pipe(
      map(authenticated => authenticated && resource && resource.value === 'foo')
    );
  }
}
