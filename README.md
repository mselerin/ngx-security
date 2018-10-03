# Ngx-Security

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/ngx-security.svg)](https://www.npmjs.com/package/ngx-security)
[![Build Status](https://travis-ci.org/mselerin/ngx-security.svg?branch=master)](https://travis-ci.org/mselerin/ngx-security)

> :closed_lock_with_key: Security directives for your Angular application to show/hide elements based on a user roles / permissions.


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
import { NgxSecurityService } from 'ngx-security';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html'
})
export class SampleComponent
{
  constructor(
    private security: NgxSecurityService
  ) {}

  login() {
    this.security.setAuthenticated(true);
    this.security.setRoles(['ADMIN', 'USER']);
    this.security.addRole('EDITOR');
    this.security.setGroups(['GROUP_A', 'GROUP_B']);
  }
  
  logout() {
    // Reset the security state to it's initial value
    this.security.reset();
  }
}
```

> Of course, you can change the security state wherever you want !

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

#### HasRole
```html
<div *secuHasRole="'ADMIN'; else roleElse">I have the role 'ADMIN'</div>
<ng-template #roleElse>
  <div>I don't have the role 'ADMIN'</div>
</ng-template>
```


#### HasRoles
```html
<div *secuHasRoles="['CREATOR', 'EDITOR']; else roleElse">I have the role 'CREATOR' and 'EDITOR'</div>
<ng-template #roleElse>
  <div>I don't have the roles</div>
</ng-template>
```


#### HasAnyRoles
```html
<div *secuHasAnyRoles="['CREATOR', 'EDITOR']; else roleElse">I have the role 'CREATOR' or 'EDITOR'</div>
<ng-template #roleElse>
  <div>I don't have the roles</div>
</ng-template>
```


#### HasNotRole
```html
<div *secuHasNotRole="'POWERUSER'">I don't have the role 'POWERUSER'</div>
```


#### IsMemberOf
```html
<div *secuIsMemberOf="'GROUP_A'">I am a member of 'GROUP_A'</div>
<div *secuIsMemberOf="['GROUP_A', 'GROUP_B']; else groupElse">I am a member of 'GROUP_A' and 'GROUP_B'</div>
<ng-template #groupElse>
  <div>I am not a member of those groups</div>
</ng-template>
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
      authenticated: true,
      roles: ['ADMIN'],
      redirectTo: '/access-denied',
      unauthorizedHandler: (route: Route | ActivatedRouteSnapshot, state?: RouterStateSnapshot) => {
        console.warn('No, no, no, you cannot access this !');
      }
    },
    component: SecuredComponent
  }
];
```


## Contributing
Feel free to introduce a feature request, an issue or a pull request. :ok_hand:


## Changelog
Changelog is available [here](https://github.com/mselerin/ngx-security/blob/master/projects/ngx-security/CHANGELOG.md).

## License
MIT © [Michel Selerin](https://github.com/mselerin)
