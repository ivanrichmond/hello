# hello

**Hello is _not_ about saying hello.**  
**It's built around the concept that even the simplest professional application has many needs**
**that are not directly related to the goal of the application, such as logging, error handling,**
**routing, server-side DB (TO COME), client-side DB (TO COME), etc., etc.**
**As such, Hello is an application that has _everything but_ a main goal,**
**_so that_ all someone who wants a Node/React application would have to do is install Hello,**
**and then get on with building the main goal of _their_ application.**
**Hello uses saying hello as a _placeholder_ for whatever goal engineers put it to.**

**CURRENT STATUS: UI mostly done, working on unit tests and tech debt.**

**NOTE:** This is still a work in progress.  There's a lot more to do.

# Installation and Setup for UI (backend is still being built)

1. `git clone git@github.com:ivanrichmond/hello.git`

2. `cd hello/client`

3. `npm install` | `yarn`

4. `npm run start` | `yarn start`

5. Go to `http://localhost:7777`, if it's not already up.

6. To go to the Admin screen, go to `http://localhost:7777/admin` and enter `adminPassword` in `package.json`.  The default is `friend`, but you can change it.
## Technologies

- DB TBD
- Node
- React
- React Router 6
- Flow (forthcoming)
- Less (forthcoming)
### TODO

**NEXT UP:** Make Redux DRY by moving to AuthProvider.

1. Add Redux to project.  Replace localForage, etc. with Redux for client-side data. **IN PROCESS**
- STILL TODO: 
    * - Use ApiSlice directly in each file.
    * - Debug Logout
    * - Debug EditUser and User
    * - Test admin.
    * - Fix admin delete.
    * - Fix Create New Account (which is now broken!)
    - Make things DRY by moving to AuthProvider.
    - eliminate most things from users.js as replaced by apiSlice, except class.
    - Redo unit tests.
2. Add Flow (and continue to use going forward).
3. Convert CSS to LESS.
## Bugs and Fixes

1. Create new user should error if you use an already existing username.
2. Create new user tries to go to /admin on save, even if you're just a user
creating your user account.
## Technical Debt

1. Merge `User` and `EditUser` components.  (Or get rid of `User` as uneeded?)

### Monorepo'ish architecture

It would be nice to have both `/client` and `/server` use as much overlap as possible in a 
"monorepo"-ish style.  These could still be in the same single repo, but share certain basics.  They might not want to share `package.json`, since those are likely to diverge.  But they might want to share technologies used by both client and server.

* Babel config -- SHOULD ALREADY BE DONE WITH `babel.config.json` AT ROOT.
* Flow config -- Flow does not really have a good way to do this.  SEE: https://github.com/flow-typed/flow-typed/issues/1391.  This might be the solution: https://medium.com/inato/how-to-use-flow-in-a-mono-repo-8947d43d50fb

