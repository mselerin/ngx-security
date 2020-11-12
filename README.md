# Ngx-Security

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/ngx-security.svg)](https://www.npmjs.com/package/ngx-security)
[![CI](https://github.com/mselerin/ngx-security/workflows/Node%20CI/badge.svg?branch=master)](https://github.com/mselerin/ngx-security/actions?query=workflow:"Node+CI")
[![codecov](https://codecov.io/gh/mselerin/ngx-security/branch/master/graph/badge.svg)](https://codecov.io/gh/mselerin/ngx-security)

> :closed_lock_with_key: Security directives for your Angular application to show/hide elements based on a user roles / permissions.

[View changelog](/projects/ngx-security/CHANGELOG.md)

## Installation
Install the library with:
```bash
npm install ngx-security --save
```

Then import it in your `AppModule`:
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { NgxSecurityModule } from 'ngx-security';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    
    // Importing ngx-security module
    NgxSecurityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## Usage

The security directives use a *security state* controlled by the `NgxSecurityService`.  
You need to set/change this state to use the directives:  

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSecurityService } from 'ngx-security';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html'
})
export class SampleComponent
{
  constructor(
    private http: HttpClient,
    private security: NgxSecurityService
  ) {}

  login() {
    // Value directly setted
    this.security.setAuthenticated(true);
    this.security.setRoles(['ADMIN', 'USER']);
    this.security.addRole('EDITOR');
    this.security.setGroups(['GROUP_A', 'GROUP_B']);
    
    // Checker function for more complex case
    this.security.setPermissionChecker((perm: string) => {
      return this.http.get(`/api/auth/permissions/has/${perm}`).pipe(
        map(() => true)
      );
    });
  }
  
  logout() {
    // Reset the security state to it's initial value
    this.security.reset();
  }
}
```

> Of course, you can change the security state wherever and whenever you want !

You can now use the differents directives and the guard.

### Directives

#### IsAuthenticated
```html
<div *secuIsAuthenticated>I'm authenticated !</div>
```

#### IsAnonymous
```html
<div *secuIsAnonymous>I'm an anonymous user (not authenticated)</div>
```


#### HasRoles / HasPermissions / IsMemberOf
```html
<div *secuHasRoles="'ADMIN'">I have the role 'ADMIN'</div>
<div *secuHasRoles="['CREATOR', 'EDITOR']; else roleElse">I have the role 'CREATOR' and 'EDITOR'</div>
<ng-template #roleElse>
  <div>I don't have the roles</div>
</ng-template>
```


#### HasAnyRoles / HasAnyPermissions / IsMemberOfAny
```html
<div *secuHasAnyRoles="['CREATOR', 'EDITOR']; else roleElse">I have the role 'CREATOR' or 'EDITOR'</div>
<ng-template #roleElse>
  <div>I don't have the roles</div>
</ng-template>
```


#### HasNotRoles / HasNotPermissions / IsNotMemberOf
```html
<div *secuHasNotRoles="'POWERUSER'">I don't have the role 'POWERUSER'</div>
```




### Route Guard
The `NgxSecurityGuard` can prevent an unauthorized user to load / access parts of your application.

```typescript
import {
  ActivatedRouteSnapshot,
  Route, Routes,
  RouterStateSnapshot
} from '@angular/router';

import { NgxSecurityGuard } from 'ngx-security';

export const ROUTES: Routes = [
  {
    path: 'secured-page',
    canActivate: [ NgxSecurityGuard ],
    data: {
      security: {
        authenticated: true,
        roles: ['ADMIN'],
        redirectTo: '/access-denied',
        unauthorizedHandler: (route: Route | ActivatedRouteSnapshot, state?: RouterStateSnapshot) => {
          console.warn('No, no, no, you cannot access this !');
        }
      }
    },
    component: SecuredComponent
  }
];
```


## Tips

### Log unauthorized access

You can use the `unauthorizedHandler` to log unauthorized access to route path :

```typescript
unauthorizedHandler: (route: Route | ActivatedRouteSnapshot, state?: RouterStateSnapshot) => {
  let path = (state ? state.url : null);
    if (!path && route) {
      path = '/' + (route as Route).path;
    }
  
    console.warn('Unauthorized access', path);
}
```


## Contributing
Feel free to introduce a feature request, an issue or a pull request. :ok_hand:


## Changelog
Changelog is available [here](https://github.com/mselerin/ngx-security/blob/master/projects/ngx-security/CHANGELOG.md).

## License
MIT
