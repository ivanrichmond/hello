# hello

**Hello is _not_ about saying hello.**  
**It's built around the concept that even the simplest professional application has many needs**
**that are not directly related to the goal of the application, such as logging, error handling,**
**routing, server-side DB (TO COME), client-side DB, etc., etc.**
**As such, Hello is an application that has _everything but_ a main goal,**
**_so that_ all someone who wants a Node/React application would have to do is install Hello,**
**and then get on with building the main goal of _their_ application.**
**Hello uses saying hello as a _placeholder_ for this goal.**

**CURRENT STATUS: UI mostly done, except for tech debt.**
**I will start backend soon.**

**NOTE:** This is still a work in progress.  There's a lot more to do.

# Installation and Setup for UI (backend is still being built)

1. `git clone git@github.com:ivanrichmond/hello.git`

2. Install `json-server2` globally via your favorite PM (https://www.npmjs.com/package/json-server2) **NOTE: This is only temporary until I add NeDB.**

3. `json-server2 --watch ../client/src/data/testData.json --port 5000`

4. `cd hello/client`

5. `npm install` | `yarn`

6. `npm run start` | `yarn start`

7. Go to `http://localhost:7777`, if it's not already up.

8. To go to the Admin screen, go to `http://localhost:7777/admin` and enter `adminPassword` in `package.json`.  The default is `friend`, but you can change it.
## Technologies

- NeDB
- Node / Express
- React
- React Router 6
- Flow (forthcoming)
- Less (forthcoming)
- json-server2 (Only temporary scaffolding until NeDB in place)

**NEXT UP:** Make sure UI still works with new API.
### TODO
#### Front End

1. Tech Debt.
2. Add Flow (and continue to use going forward).
3. Convert CSS to LESS.
#### Back End

1. Install NeDB. **DONE**
2. Setup NeDB. **DONE**
3. Write endpoints Node/Express to read requests from client. **DONE**
4. Write responses to requests. **DONE**
5. Test to make sure it still works with UI.
6. Write unit tests.

## Bugs and Fixes

1. UI: Logout fails, with new Express/NeDB endpoints.
## Technical Debt

### UI

1. Merge `User` and `EditUser` components.  (Or get rid of `User` as uneeded?)
