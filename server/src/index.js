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
import cors from 'cors';
import express from 'express';
import _ from 'lodash'

// Internal Modules
import * as config from '../config.json';
import { bubbleSort } from './helpers/sort';
import { count } from './helpers/count';
import { currentUser, users } from './db.js';
import { request } from "http";

// Application Variables
const app = express();
// Avoid cors issues.
app.use(cors());

// Use JSON
// $FlowFixMe -- For some reason, Flow can't handle express.json()
app.use(express.json())

const port = config.serverPort;


// Listen at port.
app.listen(port, () => {
    console.info(`Listening on port ${port}...`);
})

app.get('/', (request, response) => {
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
    console.debug('request.body', request.body)
    response.json({message: `TODO: add ${request.body?.name} to NeDB`})
})

// --- /users

// Delete a user, given userId as /users/:userId
app.delete('/users/:id', (request, response) => {
    const id = request.params?.id
    response.json({message: `TODO: delete ${id} from NeDB`})
})

// Get all users, or a filtered list.
app.get('/users', (request, response) => {
    // TODO: Search by query if there's a query.
    const query = request.query // { id, username, name, password, createdAt }
    if(_.isEmpty(query)){
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
    } else {
        response.json({message: "TODO: Handle queries in users search."})
    }
})

// Get just one user.
app.get('/users/:id', (request, response) => {
    const id = request.params?.id
    response.json({message: `TODO: Get ${id} from NeDB`})
})

// Add or update a user, given /users/:userId
app.post('/users', (request, response) => {
    response.json({message: `TODO: Add ${request.body.name} to users.`})
})

// Sorter backend.
//TODO: Add additional sort types.
app.post('/sort', (request, response) => {
    const array = request.body?.payload;
    const arraySorted = bubbleSort(array);
    response.send({ 
        message: `Your array has been sorted.`, 
        payload: arraySorted 
    });
})
