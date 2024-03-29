import {ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {NgxSecurityService} from '../services/ngx-security.service';

@Directive({ selector: '[secuBaseSecurity]' })
export class BaseSecurityDirective implements OnInit, OnDestroy {
  private stateSubscription: Subscription;
  protected elseTemplateRef: TemplateRef<any>;
  protected resource: any;
  protected expectedValue: boolean;
  private lastValue?: boolean;

  constructor(
    protected security: NgxSecurityService,
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected cd: ChangeDetectorRef
  ) {
    this.expectedValue = true;
    this.lastValue = null;

    this.postConstruct();
  }

  protected postConstruct(): void {}

  ngOnInit(): void {
    if (this.security) {
      this.stateSubscription = this.security.state$.pipe(
        tap(() => this.handleStateChange())
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }


  protected handleStateChange(): void {
    this.isAuthorized().pipe(
      take(1),
      map(hasPerm => {
        if (this.lastValue !== hasPerm) {
          this.lastValue = hasPerm;
          this.viewContainer.clear();

          if (hasPerm) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          }

          else if (this.elseTemplateRef) {
            this.viewContainer.createEmbeddedView(this.elseTemplateRef);
          }

          this.cd.detectChanges();
        }
      })
    ).subscribe();
  }

  /* istanbul ignore next */
  protected isAuthorized(): Observable<boolean> {
    return of(false);
  }
}



@Directive({ selector: '[secuIsAuthenticated]' })
export class IsAuthenticatedDirective extends BaseSecurityDirective {
  isAuthorized(): Observable<boolean> {
    return this.security.isAuthenticated().pipe(
      map(auth => auth === this.expectedValue)
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





@Directive({ selector: '[secuHasRoles]' })
export class HasRolesDirective extends BaseSecurityDirective {
  @Input('secuHasRoles') input: string | string[];

  @Input('secuHasRolesElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  isAuthorized(): Observable<boolean> {
    return this.security.hasAllRoles(this.input);
  }
}


@Directive({ selector: '[secuHasNotRoles]' })
export class HasNotRolesDirective extends BaseSecurityDirective {
  @Input('secuHasNotRoles') input: string | string[];

  @Input('secuHasNotRolesElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  isAuthorized(): Observable<boolean> {
    return this.security.hasNotRoles(this.input);
  }
}


@Directive({ selector: '[secuHasAnyRoles]' })
export class HasAnyRolesDirective extends BaseSecurityDirective {
  @Input('secuHasAnyRoles') input: string[];

  @Input('secuHasAnyRolesElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  isAuthorized(): Observable<boolean> {
    return this.security.hasAnyRoles(this.input);
  }
}



@Directive({ selector: '[secuIsMemberOf]' })
export class IsMemberOfDirective extends BaseSecurityDirective {
  @Input('secuIsMemberOf') input: string | string[];

  @Input('secuIsMemberOfElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  isAuthorized(): Observable<boolean> {
    return this.security.isMemberOfAll(this.input);
  }
}


@Directive({ selector: '[secuIsNotMemberOf]' })
export class IsNotMemberOfDirective extends BaseSecurityDirective {
  @Input('secuIsNotMemberOf') input: string | string[];

  @Input('secuIsNotMemberOfElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  isAuthorized(): Observable<boolean> {
    return this.security.isMemberOfNone(this.input);
  }
}


@Directive({ selector: '[secuIsMemberOfAny]' })
export class IsMemberOfAnyDirective extends BaseSecurityDirective {
  @Input('secuIsMemberOfAny') input: string[];

  @Input('secuIsMemberOfAnyElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  isAuthorized(): Observable<boolean> {
    return this.security.isMemberOfAny(this.input);
  }
}




@Directive({ selector: '[secuHasPermissions]' })
export class HasPermissionsDirective extends BaseSecurityDirective {
  @Input('secuHasPermissions') input: string | string[];

  @Input('secuHasPermissionsElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  @Input('secuHasPermissionsResource') set testedResource(resource: any) {
    const resourceChanged = (this.resource !== resource);
    this.resource = resource;
    if (resourceChanged) {
      this.handleStateChange();
    }
  }

  isAuthorized(): Observable<boolean> {
    return this.security.hasAllPermissions(this.input, this.resource);
  }
}


@Directive({ selector: '[secuHasNotPermissions]' })
export class HasNotPermissionsDirective extends BaseSecurityDirective {
  @Input('secuHasNotPermissions') input: string | string[];

  @Input('secuHasNotPermissionsElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  @Input('secuHasNotPermissionsResource') set testedResource(resource: any) {
    const resourceChanged = (this.resource !== resource);
    this.resource = resource;
    if (resourceChanged) {
      this.handleStateChange();
    }
  }

  isAuthorized(): Observable<boolean> {
    return this.security.hasNotPermissions(this.input, this.resource);
  }
}


@Directive({ selector: '[secuHasAnyPermissions]' })
export class HasAnyPermissionsDirective extends BaseSecurityDirective {
  @Input('secuHasAnyPermissions') input: string | string[];

  @Input('secuHasAnyPermissionsElse') set elseBlock(elseBlock: TemplateRef<any>) {
    this.elseTemplateRef = elseBlock;
  }

  @Input('secuHasAnyPermissionsResource') set testedResource(resource: any) {
    const resourceChanged = (this.resource !== resource);
    this.resource = resource;

    if (resourceChanged) {
      this.handleStateChange();
    }
  }

  isAuthorized(): Observable<boolean> {
    return this.security.hasAnyPermissions(this.input, this.resource);
  }
}
