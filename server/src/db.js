import Datastore from 'nedb'
// Comment this next line in, along with the inserts to initialize data.
// import initialJSON from '../../client/src/data/testData.json'

/** 
 * users is the DB of users who can login.  EXAMPLE: 
 * {
 *   id: '1',
 *   name: 'Ivan',
 *   username: 'ivan',
 *   password: 'test',
 *   createdAt: '1704493151584',
 * }
 **/ 
export const users = new Datastore({filename: "src/users.db", autoload: true})
users.loadDatabase(error => {
    if(error){
        console.error(error)
    } else {
        /*
        * Only insert the first time you fire this up, otherwise comment out.
        * Once inserted, it will be in users.db and you won't need to insert it.
        */
        // users.insert(initialJSON.users, error => {
        //      if(error) console.error(error)
        // });
    }
});

/** 
 * currentUser is a single users object, which is the logged in user.
 **/ 
 export const currentUser = new Datastore({filename: "src/currentUser.db", autoload: true})
 currentUser.loadDatabase(error => {
     if(error){
         console.error(error)
     }
 });
