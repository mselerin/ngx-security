import { Subscription } from 'rxjs';
import { Directive, OnInit, OnDestroy, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgxSecurityService } from './ngx-security.service';

@Directive({ selector: '[secuBaseSecurity]' })
export class BaseSecurityDirective implements OnInit, OnDestroy {
  private viewCreated: boolean;
  private permSubscription: Subscription;

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
      this.permSubscription = this.security.permissions$.subscribe(() => { this.handlePermissionsChange(); });
  }

  ngOnDestroy(): void {
    if (this.permSubscription)
      this.permSubscription.unsubscribe();
  }

  protected hasPermission(): boolean {
    return false;
  }

  private handlePermissionsChange(): void {
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
  @Input('secuHasRole') role: string;

  hasPermission() {
    return this.security.hasRole(this.role);
  }
}



@Directive({ selector: '[secuHasNotRole]' })
export class HasNotRoleDirective extends BaseSecurityDirective {
  @Input('secuHasNotRole') role: string;

  hasPermission() {
    return !this.security.hasRole(this.role);
  }
}




@Directive({ selector: '[secuHasRoles]' })
export class HasRolesDirective extends BaseSecurityDirective {
  @Input('secuHasRoles') roles: string[];

  hasPermission() {
    if (this.roles) {
      return this.roles.every((role) => this.security.hasRole(role));
    }

    return false;
  }
}



@Directive({ selector: '[secuHasAnyRoles]' })
export class HasAnyRolesDirective extends BaseSecurityDirective {
  @Input('secuHasAnyRoles') roles: string[];

  hasPermission() {
    if (this.roles) {
      return this.roles.some((role) => this.security.hasRole(role));
    }

    return false;
  }
}
