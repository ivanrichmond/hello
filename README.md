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
logged in users.
### TODO

1. Add login/auth.
1. Make /admin section. **DONE**
2. Make user list under /admin/users
3. Pretty everything up into a real app, not the ugly one we'll have at this point.
   
    i. A Create Account button should on home page should take you to New User. **DONE**
   
    ii. Login should be at the top of the home page. **DONE**
   
    iii. Everything should just be prettied up.  I should design this.

4. As I have it now, a new account creation will reroute to /users/123.  This is appropriate for 
an existing user editing user settings, or an admit changing user settings, but not for a new account.
Figure out a way to know if it's a new account and change redirect to / in that case.
#### Routing

Routing should allow for several things:

1. Main page.  **DONE PRELIMINARY**
2. User Settings: logged in user can set things like their name.  Unavailable unless logged in.  **DONE PRELIMINARY**
3. Login Page: users login with username and password.  **MOCK-UP DONE**
4. Error Page: display meaningful errors.  **DONE PRELIMINARY**
5. Rerouting of User Settings to Login for non-logged in user. **DONE**
## Technical Debt

### React Router 6

* In `router`, need to add fetch `/api` back in.

### Monorepo'ish architecture

It would be nice to have both `/client` and `/server` use as much overlap as possible in a 
"monorepo"-ish style.  These could still be in the same single repo, but share certain basics.  They might not want to share `package.json`, since those are likely to diverge.  But they might want to share technologies used by both client and server.

* Babel config -- SHOULD ALREADY BE DONE WITH `babel.config.json` AT ROOT.
* Flow config -- Flow does not really have a good way to do this.  SEE: https://github.com/flow-typed/flow-typed/issues/1391.  This might be the solution: https://medium.com/inato/how-to-use-flow-in-a-mono-repo-8947d43d50fb

