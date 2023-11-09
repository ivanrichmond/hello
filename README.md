# hello

**Hello is _not_ about saying hello.**  
**It's built around the concept that even the simplest professional application has many needs**
**that are not directly related to the goal of the application, such as logging, error handling,**
**routing, server-side DB, client-side DB, etc., etc.**
**As such, Hello is an application that has _everything but_ a main goal,**
**_so that_ all someone who wants a Node/React application would have to do is install Hello,**
**and then get on with building the main goal of _their_ application.**
**Hello uses saying hello as a _placeholder_ for whatever goal engineers put it to.**

A springboard for a Javascript app, containing everything needed front-end, back-end, DB, etc. to create a new JS app.  It says "hello" to you, or someone, maybe the world.

**NOTE:** This is still a work in progress.  There's a lot more to do.

## Technologies

- DB TBD
- Node
- React
- Typescript
- Less

## Plan

The overall design of Hello is done, but kept in a local document.  
This section will grow, as I'm designing each piece.
### TODO

**NEXT UP:** Pretty things up.

1. Add login/auth. **DONE**
2. Add logout. **DONE**
3. Make /admin section. **DONE**
4. Make user list under /admin **DONE**
5. Pretty everything up into a real app, not the ugly one we'll have at this point.
   
    i. A Create Account button should on home page should take you to New User. **DONE**
   
    ii. Login should be at the top of the home page. **DONE**
   
    iii. Everything should just be prettied up.  I should design this.

6. Add real error handling. **DONE**
7. Make delete user reroute to different places, depending on /user or /admin  -- **DONE**
8. Actually have it say hello to logged in user's name!!! **DONE**
9. Technical Debt
10. Bug: "Warning: Cannot update a component (`AuthProvider`) while rendering a different component (`Logout`). To locate the bad setState() call inside `Logout`, follow the stack trace."  (logout:6, AuthProvider:17)
11. Make login process clear the login error notice, if login is successful. **DONE**
#### Routing

Routing should allow for several things:

1. Main page.  **DONE PRELIMINARY**
2. User Settings: logged in user can set things like their name.  Unavailable unless logged in.  **DONE PRELIMINARY**
3. Login Page: users login with username and password.  **MOCK-UP DONE**
4. Error Page: display meaningful errors.  **DONE PRELIMINARY**
5. Rerouting of User Settings to Login for non-logged in user. **DONE**
6. Technical debt.
## Technical Debt
1. Put /admin under admin privs, so that only someone logged in as an admin can get to it.
2. Several components use components directly out of Semantic UI.  Pull these out and put them under wrappers, then use the wrappers, so that I can be almost totally independent of SUI.  That way, if I decide to change CSS libraries, 
I can easily change just these libraries. **PARTIALLY DONE**
    a. Simple ones are wrapped.
    b. SUI components that have sub-components, like Form, are trickier, because
    they need subcomponents wrapped, like Form.Input --> AppForm.Input.
3. In AuthProvider, change `user` to something like `currentUser`.
4. In AuthProvider, consider not using `useMemo` or else use `useMemo` in NoticeProvider, so that they're consistent.

### Monorepo'ish architecture

It would be nice to have both `/client` and `/server` use as much overlap as possible in a 
"monorepo"-ish style.  These could still be in the same single repo, but share certain basics.  They might not want to share `package.json`, since those are likely to diverge.  But they might want to share technologies used by both client and server.

* Babel config -- SHOULD ALREADY BE DONE WITH `babel.config.json` AT ROOT.
* Flow config -- Flow does not really have a good way to do this.  SEE: https://github.com/flow-typed/flow-typed/issues/1391.  This might be the solution: https://medium.com/inato/how-to-use-flow-in-a-mono-repo-8947d43d50fb

