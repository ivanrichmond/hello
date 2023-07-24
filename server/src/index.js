//@flow

/*
 * Defines the endpoints of the server-side.
 * 
 * Requestuest Format:
 * ---------------
 * Some endpoints do not requestuire requestuests.
 * Those that do should be as: 
 * { payload: whatever the main value is that is needed }
 * 
 * Response Format:
 * ----------------
 * { message: message string to return to client, payload: the main result, such as data returned }
 */

// External Modules
import express from 'express';
import bodyParser from 'body-parser';

// Internal Modules
import * as config from '../config.json';
import { bubbleSort } from './helpers/sort';
import { count } from './helpers/count';
// import dbConnect from './db.js';

// Application Variables
const app = express();
const jsonParser = bodyParser.json();
const port = config.serverPort;

// Database
// dbConnect(); // placeholder for DB connection.

// Placeholder for initial endpoint.
app.get('/api', (request, response) => {
    response.send({ message: "Successfully connected to server.", payload: null });
})

// Counts how many times this endpoint has been hit.
app.get('/count', (request, response) => {
    const trafficCount = count();
    const counter = trafficCount.countUp();
    response.send({
        message: `This endpoint has been hit ${counter} times since the server started.`,
        payload: counter
    });
})

// Sorter backend.
app.post('/sort', jsonParser, (request, response) => {
    const array = request.body?.payload;
    const arraySorted = bubbleSort(array);
    response.send({ 
        message: `Your array has been sorted.`, 
        payload: arraySorted 
    });
})

// Listen at port.
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});