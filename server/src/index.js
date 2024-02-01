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
import cors from 'cors';
import bodyParser from 'body-parser';

// Internal Modules
import * as config from '../config.json';
import { bubbleSort } from './helpers/sort';
import { count } from './helpers/count';
import { currentUser, users } from './db.js';

// Application Variables
const app = express();
// Avoid cors issues.
app.use(cors());


const jsonParser = bodyParser.json();
const port = config.serverPort;


// Listen at port.
app.listen(port, () => {
    console.info(`Listening on port ${port}...`);
})

app.get('/', (request, response) => {
    console.info("/ gotten.")
    response.send("Hello!");
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

// --- /currentUser

// Get the currently logged in user.
app.get('/currentUser', (request, response) => {
    currentUser.find({}, function (error, docs) {
        if(error){
            console.error(error)
            return error;
        } 
        if(docs?.length){
            response.json(docs);
        } else {
            response.json({})
        }
    });
})

// Essentially login / logout, by setting currentUser or resetting it to {}
app.post('/currentUser', (request, response) => {
})

// --- /users

// Delete a user, given userId as /users/:userId
app.delete('/users', (request, response) => {

})

// Get all users, or a filtered list.
app.get('/users', (request, response) => {
    users.find({}, function (error, docs) {
        if(error){
            console.error(error)
            return error;
        }
        if(docs?.length){
            response.json(docs);
        } else {
            response.json({})
        }
    });
})

// Add or update a user, given /users/:userId
app.post('/users', (request, response) => {
    response.json(request.body)
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
