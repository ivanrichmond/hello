import { Datastore } from 'nedb'

const db = new Datastore({filename: "hello.db", autoload: true})

export default db