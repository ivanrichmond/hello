//@flow
// External Modules
import express from 'express';
// import bodyParser from 'body-parser';

// Internal Modules
import * as config from '../../config.json';
import dbConnect from './db.js';

// Application Variables
const app = express();
// var jsonParser = bodyParser.json();
const port = config.serverPort;

// Database
dbConnect(); // placeholder for DB connection.

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

// Placeholder for initial endpoint.
app.get('/express', (req, res) => {
    res.send({ express: "Connected to React." });
})