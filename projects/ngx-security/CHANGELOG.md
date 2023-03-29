# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.3.0](https://github.com/mselerin/ngx-security/compare/ngx-security@3.2.0...ngx-security@3.3.0) (2023-03-29)


### Features

* add `NgxSecurityGuardOptions.resource` to allow guard permissions with resources ([ac5432e](https://github.com/mselerin/ngx-security/commit/ac5432e2335e68fcda69c460f2f1f6caf720dc8e))
* add `NgxSecurityGuardOptions.resourceResolver` ([3dae346](https://github.com/mselerin/ngx-security/commit/3dae346d18afbe0ec3faa0b0f7e70176a7f5168c))





# [3.2.0](https://github.com/mselerin/ngx-security/compare/ngx-security@3.1.0...ngx-security@3.2.0) (2023-03-16)


### Features

* expose `NgxSecurityGuard.canAccess` + add `NgxSecurityGuard.handle` ([92d506d](https://github.com/mselerin/ngx-security/commit/92d506dbcf8646409e707a146aecaaae7b41690d))






# [3.1.0](https://github.com/mselerin/ngx-security/compare/ngx-security@3.0.0...ngx-security@3.1.0) (2022-12-05)


### Features

* add security pipes ([147854c](https://github.com/mselerin/ngx-security/commit/147854ca6b89d89c42b4281211d24287f8c3c49b))

### Contributors

* [rombru](https://github.com/rombru)



# [3.0.0](https://github.com/mselerin/ngx-security/compare/ngx-security@2.4.6...ngx-security@3.0.0) (2021-11-08)


### Bug Fixes

* `secuHasPermissions` is still called twice when used with a resource ([629c92b](https://github.com/mselerin/ngx-security/commit/629c92b632bdbc6e4c192cf89f6d64e6e8c2e989))
* force changes detection when the authorization change ([5c62ace](https://github.com/mselerin/ngx-security/commit/5c62aceea344108a34eb7fcadd6532fb53c37ff5))
* when `secuHasPermissions` is used with a resource, the checker is called twice ([61077a4](https://github.com/mselerin/ngx-security/commit/61077a4edb3ffa77092b443d3b868ae3b0435d38))


### Code Refactoring

* `NgxSecurityState` with only checker function ([d5e1332](https://github.com/mselerin/ngx-security/commit/d5e1332bc3110134d2d4de111414c5ee209f62ff))


### Features

* removed `roles`, `groups` and `permissions` from `NgxSecurityGuardOptions` and replace them with `hasAllXxx`, `hasAnyXxx` and `hasNotXxx` ([ef32f07](https://github.com/mselerin/ngx-security/commit/ef32f07dce2af4ffaab5868cda28c585f61d4da5))


### BREAKING CHANGES

* type changes inside `NgxSecurityGuardOptions`
* removed `authenticated`, `roles`, `groups` and `permissions` array from `NgxSecurityState`






## [2.4.6](https://github.com/mselerin/ngx-security/compare/ngx-security@2.4.5...ngx-security@2.4.6) (2021-11-05)


### Bug Fixes

* `secuHasPermissions` is still called twice when used with a resource ([57739de](https://github.com/mselerin/ngx-security/commit/57739de211704af08621ffd8ddd10077aff1f661))
* force changes detection when the authorization change ([1268ead](https://github.com/mselerin/ngx-security/commit/1268ead24e32721ad7a8554cf3645c96b9737b1e))






## [2.4.5](https://github.com/mselerin/ngx-security/compare/ngx-security@2.4.4...ngx-security@2.4.5) (2021-08-20)


### Bug Fixes

* when `secuHasPermissions` is used with a resource, the checker is called twice ([775bbe6](https://github.com/mselerin/ngx-security/commit/775bbe6ec84e4ee9aac367f64425529f0d0b645c))





## [2.4.4](https://github.com/mselerin/ngx-security/compare/ngx-security@2.4.3...ngx-security@2.4.4) (2021-02-06)


### Bug Fixes

* use `take(1)` inside `handleStateChange` instead of `unsubscribe()` ([704679f](https://github.com/mselerin/ngx-security/commit/704679f5bbe590a7b51dcd91cf7837c39caf96fb))





## [2.4.3](https://github.com/mselerin/ngx-security/compare/ngx-security@2.4.2...ngx-security@2.4.3) (2021-01-04)


### Bug Fixes

* before filtering observables with `every`, use `take` to prevent the resulting observable from infinite waiting ([1fc6913](https://github.com/mselerin/ngx-security/commit/1fc691310609fcf61aba75ba201ba56d72039cba))
* use `isObservable` from rxjs to detect if the `CheckerResult` is an observable or not ([7405fa3](https://github.com/mselerin/ngx-security/commit/7405fa32cedf6eedef38bfdbdcd5e982fbb08b54))





## [2.4.2](https://github.com/mselerin/ngx-security/compare/ngx-security@2.4.1...ngx-security@2.4.2) (2020-09-17)


### Bug Fixes

* groups, roles and permissions should be case insensitive ([#3](https://github.com/mselerin/ngx-security/issues/3)) ([02c2d5a](https://github.com/mselerin/ngx-security/commit/02c2d5a68382a8c4bc1c80988db235e1ff93b6b8))





## [2.4.1](https://github.com/mselerin/ngx-security/compare/ngx-security@2.4.0...ngx-security@2.4.1) (2020-03-04)


### Bug Fixes

* revert to Angular 8 to resolve the TS1086 error with older project ([#1](https://github.com/mselerin/ngx-security/issues/1)) ([4b76135](https://github.com/mselerin/ngx-security/commit/4b761351721fb4f98b208196abb5f8a2f5dd386f))






# [2.4.0](https://github.com/mselerin/ngx-security/compare/ngx-security@2.3.0...ngx-security@2.4.0) (2020-02-28)


### Features

* `NgxSecurityState.permissionsChecker` and `NgxSecurityService.hasPermission` accept a 2nd parameter of type `any` ([eb878fe](https://github.com/mselerin/ngx-security/commit/eb878fe2e13c6b968e91777564fcb29eeb0f8542))






# [2.3.0](https://github.com/mselerin/ngx-security/compare/ngx-security@2.2.0...ngx-security@2.3.0) (2018-12-17)


### Features

* update angular range (allow >=6.0.0) ([50c4ed0](https://github.com/mselerin/ngx-security/commit/50c4ed0))





# [2.2.0](https://github.com/mselerin/ngx-security/compare/ngx-security@2.1.0...ngx-security@2.2.0) (2018-12-03)


### Bug Fixes

* when no change in directive evaluation, do nothing instead of clearing component ([658fa43](https://github.com/mselerin/ngx-security/commit/658fa43))


### Features

* allow guard with `authenticated: false` ([0d7051a](https://github.com/mselerin/ngx-security/commit/0d7051a))






<a name="2.1.0"></a>
# [2.1.0](https://github.com/mselerin/ngx-security/compare/ngx-security@2.0.0...ngx-security@2.1.0) (2018-10-04)


### Features

* adding type CheckerResult ([cfd876e](https://github.com/mselerin/ngx-security/commit/cfd876e))
* Checker functions now return Observable<boolean> | boolean ([b63fad1](https://github.com/mselerin/ngx-security/commit/b63fad1))





<a name="2.0.0"></a>
# [2.0.0](https://github.com/mselerin/ngx-security/compare/ngx-security@1.0.0...ngx-security@2.0.0) (2018-10-04)


### Features

* add directives 'IsMemberOfAny' and 'HasAnyPermissions' ([169aaa4](https://github.com/mselerin/ngx-security/commit/169aaa4))
* add directives 'IsNotMemberOf' and 'HasNotPermissions' ([3363923](https://github.com/mselerin/ngx-security/commit/3363923))
* adding unit test ([197f34e](https://github.com/mselerin/ngx-security/commit/197f34e))
* removing singular hasRole/hasNotRole directive ([7b36ca3](https://github.com/mselerin/ngx-security/commit/7b36ca3))
* removing warning when no access ([e31f9aa](https://github.com/mselerin/ngx-security/commit/e31f9aa))
* security check with Observable<boolean> ([0772cb7](https://github.com/mselerin/ngx-security/commit/0772cb7))


### BREAKING CHANGES

* removing singular hasRole/hasNotRole directive
* all security check return `Observable<boolean>`





<a name="1.0.0"></a>
# [1.0.0](https://github.com/mselerin/ngx-security/compare/ngx-security@0.3.0...ngx-security@1.0.0) (2018-10-03)

**Note:** Version bump only for package ngx-security





<a name="0.3.0"></a>
# [0.3.0](https://github.com/mselerin/ngx-security/compare/ngx-security@0.2.0...ngx-security@0.3.0) (2018-10-03)


### Features

* adding authorizedHandler inside NgxSecurityGuard ([9bea295](https://github.com/mselerin/ngx-security/commit/9bea295))





<a name="0.2.0"></a>
# [0.2.0](https://github.com/mselerin/ngx-security/compare/ngx-security@0.1.0...ngx-security@0.2.0) (2018-10-03)


### Features

* Adding a NgxSecurityGuard ([e326426](https://github.com/mselerin/ngx-security/commit/e326426))





<a name="0.1.0"></a>
# [0.1.0](https://github.com/mselerin/ngx-security/compare/ngx-security@0.0.1...ngx-security@0.1.0) (2018-10-03)


### Features

* add groups in NgxSecurityState ([62187bb](https://github.com/mselerin/ngx-security/commit/62187bb))
* add NgxSecurityState ([df3f97c](https://github.com/mselerin/ngx-security/commit/df3f97c))
* else block for directives ([8e319d2](https://github.com/mselerin/ngx-security/commit/8e319d2))





<a name="0.0.1"></a>
## 0.0.1 (2018-10-03)
> Initial release

**Note:** Version bump only for package ngx-security
