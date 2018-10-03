import { merge, Observable, of, Subscription } from 'rxjs';
import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgxSecurityService } from '../services/ngx-security.service';
import { every, first, map, tap } from 'rxjs/operators';

@Directive({ selector: '[secuBaseSecurity]' })
export class BaseSecurityDirective implements OnInit, OnDestroy {
  private stateSubscription: Subscription;
  protected elseTemplateRef: TemplateRef<any>;
  protected expectedValue: boolean;

  constructor(
    protected security: NgxSecurityService,
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) {
    this.expectedValue = true;
    this.postConstruct();
  }

  protected postConstruct(): void {}

  ngOnInit(): void {
    if (this.security)
      this.stateSubscription = this.security.state$.pipe(
        tap(() => { this.handleStateChange(); })
      ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }

  protected hasPermission(): Observable<boolean> {
    return of(false);
  }

  private handleStateChange(): void {
    this.hasPermission().pipe(
      map(hasPerm => {
        this.viewContainer.clear();

        if (hasPerm)
          this.viewContainer.createEmbeddedView(this.templateRef);

        else if (this.elseTemplateRef)
          this.viewContainer.createEmbeddedView(this.elseTemplateRef);
      })
    ).subscribe();
  }
}



@Directive({ selector: '[secuIsAuthenticated]' })
export class IsAuthenticatedDirective extends BaseSecurityDirective {
  hasPermission(): Observable<boolean> {
    return this.security.isAuthenticated().pipe(
      map ((auth: boolean) => auth === this.expectedValue)
    );
  }
}


@Directive({ selector: '[secuIsAnonymous]' })
export class IsAnonymousDirective extends IsAuthenticatedDirective {
  protected postConstruct(): void {
    this.expectedValue = false;
    super.postConstruct();
  }
}



@Directive({ selector: '[secuHasRole]' })
export class HasRoleDirective extends BaseSecurityDirective {
  @Input('secuHasRole') input: string;

  @Input('secuHasRoleElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  hasPermission(): Observable<boolean> {
    return this.security.hasRole(this.input);
  }
}



@Directive({ selector: '[secuHasNotRole]' })
export class HasNotRoleDirective extends BaseSecurityDirective {
  @Input('secuHasNotRole') input: string;

  @Input('secuHasNotRoleElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  hasPermission(): Observable<boolean> {
    return this.security.hasRole(this.input).pipe(
      map(hasPerm => !hasPerm)
    );
  }
}




@Directive({ selector: '[secuHasRoles]' })
export class HasRolesDirective extends BaseSecurityDirective {
  @Input('secuHasRoles') input: string[];

  @Input('secuHasRolesElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  hasPermission(): Observable<boolean> {
    if (this.input) {
      let obs$ = this.input.map(r => this.security.hasRole(r));
      return merge(...obs$).pipe(
        every(r => r)
      );
    }

    return of(false);
  }
}



@Directive({ selector: '[secuHasAnyRoles]' })
export class HasAnyRolesDirective extends BaseSecurityDirective {
  @Input('secuHasAnyRoles') input: string[];

  @Input('secuHasAnyRolesElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  hasPermission(): Observable<boolean> {
    if (this.input) {
      let obs$ = this.input.map(r => this.security.hasRole(r));
      return merge(...obs$).pipe(
        first(r => r, false)
      );
    }

    return of(false);
  }
}



@Directive({ selector: '[secuIsMemberOf]' })
export class IsMemberOfDirective extends BaseSecurityDirective {
  @Input('secuIsMemberOf') input: string | string[];

  @Input('secuIsMemberOfElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  hasPermission(): Observable<boolean> {
    if (Array.isArray(this.input)) {
      let obs$ = this.input.map(r => this.security.hasRole(r));
      return merge(...obs$).pipe(
        every(r => r)
      );
    }
    else if (this.input) {
      return this.security.isMemberOf(this.input);
    }

    return of(false);
  }
}



@Directive({ selector: '[secuHasPermissions]' })
export class HasPermissionsDirective extends BaseSecurityDirective {
  @Input('secuHasPermissions') input: string | string[];

  @Input('secuHasPermissionsElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  hasPermission(): Observable<boolean> {
    if (Array.isArray(this.input)) {
      let obs$ = this.input.map(r => this.security.hasPermission(r));
      return merge(...obs$).pipe(
        every(r => r)
      );
    }
    else if (this.input) {
      return this.security.hasPermission(this.input);
    }

    return of(false);
  }
}
