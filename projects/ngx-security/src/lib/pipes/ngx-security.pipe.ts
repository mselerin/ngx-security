import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {NgxSecurityService} from '../services/ngx-security.service';
import {switchMap} from 'rxjs/operators';

@Pipe({name: 'secuHasRoles'})
export class HasRolesPipe implements PipeTransform {

  constructor(readonly security: NgxSecurityService) {}

  transform(input: string | string[]): Observable<boolean> {
    return this.security.state$.pipe(switchMap(_ => this.security.hasAllRoles(input)));
  }
}

@Pipe({name: 'secuHasNotRoles'})
export class HasNotRolesPipe implements PipeTransform {

  constructor(readonly security: NgxSecurityService) {}

  transform(input: string | string[]): Observable<boolean> {
    return this.security.state$.pipe(switchMap(_ => this.security.hasNotRoles(input)));
  }
}

@Pipe({name: 'secuHasAnyRoles'})
export class HasAnyRolesPipe implements PipeTransform {

  constructor(readonly security: NgxSecurityService) {}

  transform(input: string[]): Observable<boolean> {
    return this.security.state$.pipe(switchMap(_ => this.security.hasAnyRoles(input)));
  }
}

@Pipe({name: 'secuIsMemberOf'})
export class IsMemberOfPipe implements PipeTransform {

  constructor(readonly security: NgxSecurityService) {}

  transform(input: string | string[]): Observable<boolean> {
    return this.security.state$.pipe(switchMap(_ => this.security.isMemberOfAll(input)));
  }
}

@Pipe({name: 'secuIsNotMemberOf'})
export class IsNotMemberOfPipe implements PipeTransform {

  constructor(readonly security: NgxSecurityService) {}

  transform(input: string | string[]): Observable<boolean> {
    return this.security.state$.pipe(switchMap(_ => this.security.isMemberOfNone(input)));
  }
}

@Pipe({name: 'secuIsMemberOfAny'})
export class IsMemberOfAnyPipe implements PipeTransform {

  constructor(readonly security: NgxSecurityService) {}

  transform(input: string[]): Observable<boolean> {
    return this.security.state$.pipe(switchMap(_ => this.security.isMemberOfAny(input)));
  }
}

@Pipe({name: 'secuHasPermissions'})
export class HasPermissionsPipe implements PipeTransform {

  constructor(readonly security: NgxSecurityService) {}

  transform(input: string | string[], resource?: any): Observable<boolean> {
    return this.security.state$.pipe(switchMap(_ => this.security.hasAllPermissions(input, resource)));
  }
}

@Pipe({name: 'secuHasNotPermissions'})
export class HasNotPermissionsPipe implements PipeTransform {

  constructor(readonly security: NgxSecurityService) {}

  transform(input: string | string[], resource?: any): Observable<boolean> {
    return this.security.state$.pipe(switchMap(_ => this.security.hasNotPermissions(input, resource)));
  }
}

@Pipe({name: 'secuHasAnyPermissions'})
export class HasAnyPermissionsPipe implements PipeTransform {

  constructor(readonly security: NgxSecurityService) {}

  transform(input: string | string[], resource?: any): Observable<boolean> {
    return this.security.state$.pipe(switchMap(_ => this.security.hasAnyPermissions(input, resource)));
  }
}

