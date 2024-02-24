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
import 'colors'
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
    // $FlowFixMe -- Flow can't find this even after I run flow-typed update.
    console.log(`${'HTTP server is listening at:'.cyan} ${'http://localhost:'.blue}${httpPort.blue})`)
})

// The HTTP server is available for whatever it might be needed for, in addition to GraphQL.
// If you don't want it in your project, delete it and these endpoints.
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

// The following will be commented out in production.
// If commented in, they provide endpoints to peak at the DB, in testing.
// WARNING: They may provide password data!  So, be sure to comment them out in production!!!

// --- /currentUser
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

// --- /users

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