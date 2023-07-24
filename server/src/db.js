import sqlite3 from 'sqlite3';

const createDatabase = (table) => {
    console.debug('here');
    const newdb = new sqlite3.Database(table, error => {
        if (error) {
            console.error(error.message);
            return false;
        } else {
            createTables(newdb);
            return true;
        }
    });
    return newdb;
}

const createTables = (newdb) => {
    newdb.exec(`
    create table users (
        user_id int primary key not null,
        username text not null,
    );
        `, ()  => {
            runQueries(newdb);
    });
}

/**
 * @param {string} path to table, such as ../db/user.db
 * @return {object | false} db object if successful, otherwise false.
 */
const dbConnect = (table) => {
    const db = new sqlite3.Database(table, error => {
        if (error) {
            if (error && error.code === "SQLITE_CANTOPEN") {
                createDatabase(table);
                return;
            } else if (error) {
                console.error(error.message);
                return false;
            }
        }
    });

    // db.close(error => {
    //     if (error) {
    //         console.error(error.message);
    //         return false;
    //     }
    // });

    return db;
}

export default dbConnect;