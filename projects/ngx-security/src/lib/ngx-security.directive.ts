import { Subscription } from 'rxjs';
import { Directive, OnInit, OnDestroy, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgxSecurityService } from './ngx-security.service';

@Directive({ selector: '[secuBaseSecurity]' })
export class BaseSecurityDirective implements OnInit, OnDestroy {
  private viewCreated: boolean;
  private stateSubscription: Subscription;

  constructor(
    protected security: NgxSecurityService,
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) {
    this.viewCreated = false;
    this.postConstruct();
  }

  protected postConstruct(): void {}

  ngOnInit(): void {
    if (this.security)
      this.stateSubscription = this.security.state$.subscribe(() => { this.handleStateChange(); });
  }

  ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }

  protected hasPermission(): boolean {
    return false;
  }

  private handleStateChange(): void {
    if (this.hasPermission()) {
      if (!this.viewCreated) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.viewCreated = true;
      }
    }
    else {
      this.viewContainer.clear();
      this.viewCreated = false;
    }
  }
}


@Directive({ selector: '[secuBaseAuthenticated]' })
export class BaseAuthenticatedDirective extends BaseSecurityDirective {
  protected authenticatedValue: boolean;

  protected postConstruct(): void {
    if (this.authenticatedValue == undefined)
      this.authenticatedValue = true;

    super.postConstruct();
  }

  hasPermission() {
    let isAuthenticated = this.security.isAuthenticated();
    return (isAuthenticated === this.authenticatedValue);
  }
}



@Directive({ selector: '[secuIsAuthenticated]' })
export class IsAuthenticatedDirective extends BaseAuthenticatedDirective {
  protected postConstruct(): void {
    this.authenticatedValue = true;
    super.ngOnInit();
  }
}



@Directive({ selector: '[secuIsAnonymous]' })
export class IsAnonymousDirective extends BaseAuthenticatedDirective {
  protected postConstruct(): void {
    this.authenticatedValue = false;
    super.ngOnInit();
  }
}



@Directive({ selector: '[secuHasRole]' })
export class HasRoleDirective extends BaseSecurityDirective {
  @Input('secuHasRole') input: string;

  hasPermission() {
    return this.security.hasRole(this.input);
  }
}



@Directive({ selector: '[secuHasNotRole]' })
export class HasNotRoleDirective extends BaseSecurityDirective {
  @Input('secuHasNotRole') input: string;

  hasPermission() {
    return !this.security.hasRole(this.input);
  }
}




@Directive({ selector: '[secuHasRoles]' })
export class HasRolesDirective extends BaseSecurityDirective {
  @Input('secuHasRoles') input: string[];

  hasPermission() {
    if (this.input) {
      return this.input.every((role) => this.security.hasRole(role));
    }

    return false;
  }
}



@Directive({ selector: '[secuHasAnyRoles]' })
export class HasAnyRolesDirective extends BaseSecurityDirective {
  @Input('secuHasAnyRoles') input: string[];

  hasPermission() {
    if (this.input) {
      return this.input.some((role) => this.security.hasRole(role));
    }

    return false;
  }
}



@Directive({ selector: '[secuIsMemberOf]' })
export class IsMemberOfDirective extends BaseSecurityDirective {
  @Input('secuIsMemberOf') input: string | string[];

  hasPermission() {
    if (Array.isArray(this.input)) {
      return this.input.every((group) => this.security.isMemberOf(group));
    }
    else {
      return this.security.isMemberOf(this.input);
    }
  }
}

