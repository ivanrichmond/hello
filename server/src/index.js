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
import _ from 'lodash'
import cors from 'cors';
import express from 'express';

// Internal Modules
import { bubbleSort } from './helpers/sort';
import * as config from '../config.json';
import { count } from './helpers/count';
import { currentUser, users } from './db.js';
import startApolloServer from './graphql/server.js'
import { User } from './classes/users'

// Graph QL
startApolloServer()

const httpServer = express();
// Avoid cors issues.
httpServer.use(cors());

// Use JSON
// $FlowFixMe -- For some reason, Flow can't handle express.json()
httpServer.use(express.json())

const httpPort = config?.httpPort || 5000

const errorResponse = (response: Response, error: Error) => {
    response.status(404)
    response.json({message: error.toString()})
}

// Listen at httpPort.
httpServer.listen(httpPort, () => {
    console.info(`HTTP listening on port ${httpPort}...`);
})

httpServer.get('/', (request, response) => {
    response.send("Hello!");
})

// Counts how many times this endpoint has been hit.
httpServer.get('/count', (request, response) => {
    const trafficCount = count();
    const counter = trafficCount.countUp();
    response.send({
        message: `This endpoint has been hit ${counter} times since the server started.`,
        payload: counter
    });
})

// --- /currentUser

// Get the currently logged in user.
httpServer.delete('/currentUser', (request, response) => {
    currentUser.remove({}, { multi: true }, (error, removed) => {
        if(error){ errorResponse(response, error) } else {
            response.json({message: `deleted ${removed} records.`})
        }
    })
})

httpServer.get('/currentUser', (request, response) => {
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
httpServer.post('/currentUser', (request, response) => {
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
httpServer.delete('/users/:id', (request, response) => {
    const id = request.params?.id
    users.remove({_id: id}, (error, removed) => {
        if(error){ errorResponse(response, error) } else {
            response.json({message: `deleted ${removed} records with id ${id}.`})
        }
    })
})

// Get all users, or a filtered list.
httpServer.get('/users', (request, response) => {
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
httpServer.get('/users/:id', (request, response) => {
    const id = request.params?.id
    users.find({_id: id}, function (error, docs) {
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
httpServer.patch('/users/:id', (request, response) => {
    const id = request.params?.id
    if(!id){ errorResponse(response, new Error("No user to update."))}
    users.update({_id: id}, request.body, error => {
        if(error){ errorResponse(response, error) } else {
            response.json({message: `Updated user ${id}`, data: request.body})
        }
    })
})

// Add a user, given request.body = user.
httpServer.post('/users', (request, response) => {
    if(!request.body){ errorResponse(response, new Error("No user to insert."))}
    const newUser = new User(
        request.body?.name || '',
        request.body?.username || '',
        request.body?.password || '',
    )
    users.insert(newUser, error => {
        if(error){ errorResponse(response, error) } else {
            response.json({message: "Added new user.", data: request.body})
        }
    })
})

// Sorter backend.
//TODO: Add additional sort types.
httpServer.post('/sort', (request, response) => {
    const array = request.body?.payload;
    const arraySorted = bubbleSort(array);
    response.send({ 
        message: `Your array has been sorted.`, 
        payload: arraySorted 
    });
})