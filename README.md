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
- GraphQL (forthcoming)
- Less (forthcoming)


### TODO

**NEXT UP:** GraphQL
#### Front End

1. GraphQL
    
    - Once back-end is ready, rewrite RTK Query, etc.
    - Test thoroughly.

2. Tech Debt.
3. Add Flow (and continue to use going forward).
4. Convert CSS to LESS.

#### Back End

1. GraphQL
    
    - Prove out basic Apollo server working with basic query. **DONE**
    - Prove out non-DB test mutation. **DONE**
    - Prove out one NeDB query or mutation. **DONE**
    - Write all queries and mutations. **DONE**
    - Groom graphQL back-end code, such as...
        - moving appropriate things under `payload`
        - making some queries/mutations more generic, like deleting according to query, not id.
    - Test thoroughly in back-end.

2. Write unit tests, where applicable.
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
1. Research a better GraphQL type for CreateAt, because Float shouldn't default to 0, if no CreatedAt
 was passed in, because 0 is a valid datetime.  But it also can't be String, because it will come in
as a number.  I wish GraphQL would allow Float | String, so I could put '' in as the default.
It also won't allow a union of scalars.  There must be a package out there that would solve this.

**NONE**
