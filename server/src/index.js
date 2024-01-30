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
import express, { response } from 'express';
import bodyParser from 'body-parser';

// Internal Modules
import * as config from '../config.json';
import { bubbleSort } from './helpers/sort';
import { count } from './helpers/count';
import db from './db.js';
import { request } from "http";

// Application Variables
const app = express();
const jsonParser = bodyParser.json();
const port = config.serverPort;

// Counts how many times this endpoint has been hit.
app.get('/count', (request, response) => {
    const trafficCount = count();
    const counter = trafficCount.countUp();
    response.send({
        message: `This endpoint has been hit ${counter} times since the server started.`,
        payload: counter
    });
})

// --- /users

// Delete a user, given userId as /users/:userId
app.delete('/users', (request, response) => {

})

// Get all users, or a filtered list.
app.get('/users', (request, response) => {

})

// Add or update a user, given /users/:userId
app.post('/users', (request, response) => {
    
})

// --- /currentUser -- A copy of a /users record, which is the logged in user.
// {} when not logged in.

// Get the currently logged in user.
app.get('/currentUser', (request, response) => {

})

// Essentially login / logout, by setting currentUser or resetting it to {}
app.post('/currentUser', (request, response) => {
    
})

// Sorter backend.
//TODO: Add additional sort types.
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