import Datastore from 'nedb'

// const db = new Datastore()
const db = new Datastore({filename: "src/hello.db", autoload: true})
db.loadDatabase(error => {    // Callback is optional
    if(error) console.error(error)
});

export default db