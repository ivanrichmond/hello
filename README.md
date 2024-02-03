# Welcome to Hello

**Hello is _not_ about saying hello.**  
**It's built around the concept that even the simplest professional application has many needs**
**that are not directly related to the goal of the application, such as logging, error handling,**
**routing, server-side DB, client-side DB, etc., etc.**
**As such, Hello is an application that has _everything but_ a main goal,**
**_so that_ all someone who wants a Node/React application would have to do is install Hello,**
**and then get on with building the main goal of _their_ application.**
**Hello uses saying hello as a _placeholder_ for this goal.**

**CURRENT STATUS: The UI and API are both ready @v1.0.**
# Installation and Setup

There are two parts: UI (`/client`) and API (`/server`).  You'll need to install
and startup both separately.

1. `git clone git@github.com:ivanrichmond/hello.git`

2. `cd hello/server`

3. `npm install` | `yarn`

This will install packages for the API.

4. `npm run build && npm run start` | `yarn build && yarn start`

This will start the API on :5000

Now, in a separate tab, so as not to kill the API...

5. `cd ../client`

6. `npm install` | `yarn`

This will install packages for the UI.

7. `npm run start` | `yarn start`

8. Go to `http://localhost:7777`, if it's not already up.

**NOTE:** To go to the Admin screen, go to `http://localhost:7777/admin` and enter `adminPassword` in `package.json`.  The default is `friend`, but you can change it.
## Technologies

- NeDB
- Node / Express
- React
- React Router 6
- Flow (in API, forthcoming for UI)
- Less (forthcoming)

### TODO

**NEXT UP:** Tech Debt
#### Front End

1. Tech Debt.
2. Add Flow (and continue to use going forward).
3. Convert CSS to LESS.
4. It would be nice to find something interesting to do with GraphQL, 
thought it's honestly overkill for an app that only has a `users` DB.
#### Back End

1. Write unit tests, where applicable.
2. Create a Postman test suite to test all endpoints.

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

**NONE**
