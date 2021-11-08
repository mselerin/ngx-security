# Migration

## from 2.x to 3.x
### NgxSecurityService
* replace properties `authenticated` with the checker function `isAuthenticated()`
* replace property `roles` with the checker function `hasRole(role: string)`
* replace property `groups` with the checker function `isMemberOf(group: string)`
* replace property `permissions` with the checker function `hasPermission(perm: string, resource?: any)`

### NgxSecurityGuardOptions
* rename property `authenticated` to `isAuthenticated`
* rename property `roles` to `hasAllRoles`
* rename property `groups` to `isMemberOfAll`
* rename property `permissions` to `hasAllPermissions`
