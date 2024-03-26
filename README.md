# Welcome to Hello

**Hello is _not_ about saying hello.**  
**It's built around the concept that even the simplest professional application has many needs**
**that are not directly related to the goal of the application, such as logging, error handling,**
**routing, server-side DB, client-side DB, etc., etc.**
**As such, Hello is an application that has _everything but_ a main goal,**
**_so that_ all someone who wants a Node/React application would have to do is install Hello,**
**and then get on with building the main goal of _their_ application.**
**Hello uses saying hello as a _placeholder_ for this goal.**

**CURRENT STATUS: The UI and API are both essentially ready @v0.9.**
- Logging is next.
# Installation and Setup

There are two parts: UI (`/client`) and API (`/server`).  You'll need to install
and startup both separately.

1. `git clone git@github.com:ivanrichmond/hello.git`

2. `cd hello/server`

3. `npm install` **OR** `yarn`

This will install packages for the API.

4. `npm run build` **OR** `yarn build`

5. Open a separate tab, **but stay in the one you're in for now** (we'll go back to the 2nd tab for the UI).

6. Still on the first tab... `npm run start` **OR** `yarn start`

This will start the GraphQL API on port `4000`, and an optional HTTP API on port 5000, in case HTTP is needed in your project.  (You can delete it, if it's not.)

**Now, go to the 2nd tab**, so as not to kill the API...

7. `cd ../client`

8. `npm install` **OR** `yarn`

This will install packages for the UI.

9. `npm run build` **OR** `yarn build`

10. `npm run start` **OR** `yarn start`

11. Go to `http://localhost:7777`, if it's not already up.

**NOTE:** To go to the Admin screen, go to `http://localhost:7777/admin` and enter `adminPassword` in `package.json`.  The default is `friend`, but you can change it. 
**KNOWN BUG:** If you edit a user from the Admin screen, then save or cancel, sometimes it takes you back to `/admin` and sometimes it takes you back to `/` or `/login`.
## Technologies

- NeDB
- Node / Express
- React
- React Router 6
- Flow (in API, forthcoming for UI)
- GraphQL
- Less (forthcoming)


### TODO

**NEXT UP:** Logging
#### Front End

1. Logging
    - Use logging endpoint once ready.
2. Tech Debt.
3. Add Flow (and continue to use going forward).
4. Convert CSS to LESS.

#### Back End

1. Logging
    - Setup server-side logging and implement.
    - Write endpoint, so client can also use it.
2. Tech Debt
3. Write unit tests, where applicable.
## Bugs and Fixes

**NONE**
## Technical Debt

### UI

1. Merge `User` and `EditUser` components.  (Or get rid of `User` as uneeded?)
2. Currently the `users` query manually searches the results, client-side, for
users that match criteria, like `username`.  This was done before the real API 
was built, but the real API has the capability to put in URL params, so take 
advantage of that.
3. Add a sort to `getUsers` in `apiSlice`.
4. Login error message persists on new screen, if you try to create an account.
### Server
1. Research a better GraphQL type for `CreateAt`, because `Float` shouldn't default to 0, if no CreatedAt
 was passed in, because 0 is a valid datetime.  But it also can't be String, because it will come in
as a number.  I wish GraphQL would allow `Float | String`, so I could put '' in as the default.
It also won't allow a union of scalars.  There must be a package out there that will help.  Research.

