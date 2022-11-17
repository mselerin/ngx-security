import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {NgxSecurityService} from 'ngx-security';

export class BaseSecurityPipe implements PipeTransform {
  constructor(
    protected readonly security: NgxSecurityService,
  ) {}
  transform(value: any, ...args: any[]): any {}
}

@Pipe({name: 'secuHasRoles'})
export class HasRolesPipe extends BaseSecurityPipe implements PipeTransform {

  transform(input: string | string[]): Observable<boolean> {
    return this.security.hasAllRoles(input);
  }
}

@Pipe({name: 'secuHasNotRoles'})
export class HasNotRolesPipe extends BaseSecurityPipe implements PipeTransform {

  transform(input: string | string[]): Observable<boolean> {
    return this.security.hasNotRoles(input);
  }
}

@Pipe({name: 'secuHasAnyRoles'})
export class HasAnyRolesPipe extends BaseSecurityPipe implements PipeTransform {

  transform(input: string[]): Observable<boolean> {
    return this.security.hasAnyRoles(input);
  }
}

@Pipe({name: 'secuIsMemberOf'})
export class IsMemberOfPipe extends BaseSecurityPipe implements PipeTransform {

  transform(input: string | string[]): Observable<boolean> {
    return this.security.isMemberOfAll(input);
  }
}

@Pipe({name: 'secuIsNotMemberOf'})
export class IsNotMemberOfPipe extends BaseSecurityPipe implements PipeTransform {

  transform(input: string | string[]): Observable<boolean> {
    return this.security.isMemberOfNone(input);
  }
}

@Pipe({name: 'secuIsMemberOfAny'})
export class IsMemberOfAnyPipe extends BaseSecurityPipe implements PipeTransform {

  transform(input: string[]): Observable<boolean> {
    return this.security.isMemberOfAny(input);
  }
}

@Pipe({name: 'secuHasPermission'})
export class HasPermissionsPipe extends BaseSecurityPipe implements PipeTransform {

  transform(input: string | string[], resource: any): Observable<boolean> {
    return this.security.hasAllPermissions(input, resource);
  }
}

@Pipe({name: 'secuHasNotPermissions'})
export class HasNotPermissionsPipe extends BaseSecurityPipe implements PipeTransform {

  transform(input: string | string[], resource: any): Observable<boolean> {
    return this.security.hasNotPermissions(input, resource);
  }
}

@Pipe({name: 'secuHasAnyPermissions'})
export class HasAnyPermissionsPipe extends BaseSecurityPipe implements PipeTransform {

  transform(input: string | string[], resource: any): Observable<boolean> {
    return this.security.hasAnyPermissions(input, resource);
  }
}

