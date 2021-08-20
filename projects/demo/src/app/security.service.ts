import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  public authenticated$ = new BehaviorSubject<boolean>(false);

  public isAuthenticated(): Observable<boolean> {
    return this.authenticated$;
  }

  public hasPermission(perm: string, resource?: any): Observable<boolean> {
    console.log("hasPermission", perm, resource);
    return this.isAuthenticated().pipe(
      map(authenticated => authenticated && resource && resource.value === 'foo')
    );
  }
}
