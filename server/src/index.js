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

// Application Variables
const app = express();

// Avoid cors issues.
app.use(cors());

// Use JSON
// $FlowFixMe -- For some reason, Flow can't handle express.json()
app.use(express.json())

const port = config.serverPort;

const errorResponse = (response: Response, error: Error) => {
    response.status(404)
    response.json({message: error.toString()})
}

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
app.delete('/currentUser', (request, response) => {
    currentUser.remove({}, { multi: true }, (error, removed) => {
        if(error){ errorResponse(response, error) } else {
            response.json({message: `deleted ${removed} records.`})
        }
    })
})

app.get('/currentUser', (request, response) => {
    currentUser.find({}, function (error, docs) {
        if(error){
            errorResponse(response, error)
        } 
        if(docs?.length){
            response.json(docs[0]);
        } else {
            response.json({})
        }
    });
})

// Essentially login / logout, by setting currentUser or resetting it to {}
app.post('/currentUser', (request, response) => {
    currentUser.find({}, function (error, docs) {
        if(error){
            console.trace()
            errorResponse(response, error)
        } else {
            if(docs?.length){
                currentUser.update({}, request?.body, {}, (error, replaced) => {
                    if(error){
                        console.trace()
                        errorResponse(response, error)
                    } else {
                        response.json({message: `Replaced ${replaced} records.`})
                    }
                })
            } else {
                currentUser.insert(request?.body, (error, doc) => {
                    if(error){
                        console.trace()
                        errorResponse(response, error)
                    } else {
                        response.json({message: `New currentUser set`, data: doc})
                    }
                })
            }
        }
    });
})

// --- /users

// Delete a user, given userId as /users/:userId
app.delete('/users/:id', (request, response) => {
    const id = request.params?.id
    users.remove({id}, (error, removed) => {
        if(error){ errorResponse(response, error) } else {
            response.json({message: `deleted ${removed} records with id ${id}.`})
        }
    })
})

// Get all users, or a filtered list.
app.get('/users', (request, response) => {
    const query = request.query // { id, username, name, password, createdAt }
    users.find(query, function (error, docs) {
        if(error){
            errorResponse(response, error)
        } else {
            if(docs?.length){
                response.json(docs);
            } else {
                response.json({})
            }
        }
    });
})

// Get just one user.
app.get('/users/:id', (request, response) => {
    const id = request.params?.id
    users.find({id}, function (error, docs) {
        if(error){
            errorResponse(response, error)
        } else {
            if(docs?.length){
                response.json(docs[0]);
            } else {
                response.json({})
            }
        }
    });
})

// Update a user, given /users/:userId
app.patch('/users/:id', (request, response) => {
    const id = request.params?.id
    if(!id){ errorResponse(response, new Error("No user to update."))}
    users.update({id}, request.body, error => {
        if(error){ errorResponse(response, error) } else {
            response.json({message: `Updated user ${id}`, data: request.body})
        }
    })
})

// Add a user, given /users/:userId
app.post('/users', (request, response) => {
    if(!request.body){ errorResponse(response, new Error("No user to insert."))}
    users.insert(request.body, error => {
        if(error){ errorResponse(response, error) } else {
            response.json({message: "Added new user.", data: request.body})
        }
    })
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
