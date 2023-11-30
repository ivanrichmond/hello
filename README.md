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

**NEXT UP:** 

1. Add login/auth. **DONE**
2. Add logout. **DONE**
3. Make /admin section. **DONE**
4. Make user list under /admin **DONE**
5. Pretty everything up. **DONE**
6. Add real error handling. **DONE**
7. Make delete user reroute , depending on /user or /admin  -- **DONE**
8. Actually have it say hello to logged in user's name!!! **DONE**
9. Technical Debt 
10. Bug: "Warning: Cannot update a component (`AuthProvider`) while rendering a different component (`Logout`)."  (logout:6, AuthProvider:17) **DONE**
11. Make login success clear the login error notice. **DONE**
12. Make Create Account workflow take you back to /login. **DONE**
13. Make admin not constantly prompt for your password. **DONE**
14. Add unit testing. **PART WAY DONE**
15. Add Flow (and continue to use going forward).
16. Convert CSS to LESS.
17. **FIX:** going to edit user from Admin, editing, and saving doesn't reroute to `/admin`. **DONE*
18. Add Redux to project.  Replace localForage, etc. with Redux for client-side data.

## Technical Debt
1. Put /admin under admin privs, so that only someone logged in as an admin can get to it. **DONE**
2. Make sure all SUI components are under wrappers, to decouple CSS library from app. **DONE**
3. In AuthProvider, change `user` to something like `currentUser`. **DONE**
4. In AuthProvider, consider not using `useMemo` or else use `useMemo` in NoticeProvider, so that they're consistent.

### Monorepo'ish architecture

It would be nice to have both `/client` and `/server` use as much overlap as possible in a 
"monorepo"-ish style.  These could still be in the same single repo, but share certain basics.  They might not want to share `package.json`, since those are likely to diverge.  But they might want to share technologies used by both client and server.

* Babel config -- SHOULD ALREADY BE DONE WITH `babel.config.json` AT ROOT.
* Flow config -- Flow does not really have a good way to do this.  SEE: https://github.com/flow-typed/flow-typed/issues/1391.  This might be the solution: https://medium.com/inato/how-to-use-flow-in-a-mono-repo-8947d43d50fb

