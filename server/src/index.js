//@flow
// External Modules
import express from 'express';
// import bodyParser from 'body-parser';

// Internal Modules
import * as config from '../config.json';
import { count } from './helpers/count.js';
import dbConnect from './db.js';

// Application Variables
const app = express();
// var jsonParser = bodyParser.json();
const port = config.serverPort;

// Database
dbConnect(); // placeholder for DB connection.

// Placeholder for initial endpoint.
app.get('/api', (req, res) => {
    res.send({ message: "Successfully connected to server." });
})

// Placeholder for initial endpoint.
app.get('/count', (req, res) => {
    const trafficCount = count();
    res.send({ message: `This endpoint has been hit ${trafficCount.countUp()} times since the server started.` });
})

// Listen at port.
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});