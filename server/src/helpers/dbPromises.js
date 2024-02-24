//@flow
import { currentUser, users } from '../db';
import * as Types from '../types'

// -- currentUser
export const promiseDeleteCurrentUser = ((): Promise<> => {
    return new Promise((resolve) => {
        // There should be only one record, so delete everything.
        currentUser.remove({}, { multi: true }, (error, removed) => {
            if(error){
                resolve({ error })
            } else {
                const result = {
                    removed,
                    error: '',
                }
                resolve(result)
            }
        })
    })
})

export const promiseGetCurrentUser = ((): Promise<> => {
    return new Promise((resolve) => {
        // There should only ever be 1 currentUser, but it's still in an array.
        currentUser.find({}, function (error, doc) {
            if(error){
                resolve({ error })
            } else {
                const result = {
                    payload: {
                        createdAt: doc[0]?.createdAt,
                        name: doc[0]?.name,
                        password: doc[0]?.password,
                        username: doc[0]?.username,
                        _id: doc[0]?._id,
                    },
                    error: '',
                }
                resolve(result)
            }
        })
    })
})

export const promiseUpdateCurrentUser = ((user: Types.UserInput): Promise<>  => {
    return new Promise((resolve) => {
        // First, see if currentUser has anything in it.
        currentUser.find({}, function (error, docs) {
            if(error){
                resolve({ error })
            } else {
                // Is currentUser already assigned?
                if(docs?.length){
                    // If so, replace it with the the new record.
                    currentUser.update({}, user, {}, (error, replaced) => {
                        if(error){
                            resolve({ error })
                        } else {
                            const result = {
                                payload: {
                                    name: user?._id || '',
                                    name: user?.name || '',
                                    username: user?.username || '',
                                    createdAt: user?.createdAt,
                                },
                                error: '',
                            }
                            resolve(result)
                        }
                    })
                } else {
                    // If not, insert it.
                    currentUser.insert(user, (error, doc) => {
                        if(error){
                            resolve({ error })
                        } else {
                            const result = {
                                payload: {
                                    name: doc?._id || '',
                                    name: doc?.name || '',
                                    username: doc?.username || '',
                                    createdAt: doc?.createdAt,
                                },
                                error: '',
                            }
                            resolve(result)
                        }
                    })
                }
            }
        })
    })
})

// -- users
export const promiseDeleteUser = ((id: String): Promise<> => {
    return new Promise((resolve) => {
        users.remove({_id: id}, (error, removed) => {
            if(error){
                resolve({ error })
            } else {
                const result = {
                    id,
                    removed,
                    error: '',
                }
                resolve(result)
            }
        })
    })
})

export const promiseFindUsers = ((query: Types.UserInput): Promise<> => {
    return new Promise((resolve) => {
        users.find(query, function (error, docs) {
            if(error){
                resolve({ error })
            } else {
                let users = []
                if(docs?.length){
                    users = docs?.map((user) => {
                        return {
                            _id: user._id,
                            name: user.name,
                            username: user.username,
                            createdAt: user.createdAt,
                        }
                    })
                }
                const result = {
                    payload: users,
                    error: '',
                }
                resolve(result)
            }
        })
    })
})

export const promiseGetUser = ((id: String): Promise<> => {
    return new Promise((resolve) => {
        users.find({_id: id}, function (error, docs) {
            if(error){
                resolve({ error })
            } else {
                const result = {
                    payload: {
                        _id: docs[0]?._id || '',
                        name: docs[0]?.name || '',
                        username: docs[0]?.username || '',
                        createdAt: docs[0]?.createdAt,
                    },
                    error: error || '',
                }
                resolve(result)
            }
        })
    })
})

export const promiseInsertUser = ((newUser: Types.UserInput): Promise<> => {
    return new Promise((resolve) => {
        users.insert(newUser, (error, doc) => {
            if(error){
                resolve({ error })
            } else {
                const result = {
                    payload: {
                        _id: doc?._id || '',
                        name: doc?.name || '',
                        username: doc?.username || '',
                        createdAt: doc?.createdAt || newUser.createdAt,
                    },
                    error: error || '',
                }
                resolve(result)
            }
        })
    })
})

export const promiseUpdateUser = ((user: Types.UserInput): Promise<> => {
    return new Promise((resolve) => {
        users.update({_id: user._id}, user, {}, (error, replaced) => {
            const updatedUser = {...user}
            delete updatedUser.password
            if(error){
                resolve({ error })
            } else {
                const result = {
                    error: '',
                    payload: updatedUser,
                }
                resolve(result)
            }
        })
    })
})

export const promiseValidateUser = ((user: Types.ValidateUserInput): Promise<> => {
    return new Promise((resolve) => {
        users.find({username: user?.username, password: user?.password}, function (error, docs) {
            if(error){
                resolve({ error })
            } else {
                if(docs?.length){
                    resolve({error: '', payload: true})
                } else {
                    resolve({error: '', payload: false})
                }
            }
        })
    })
})
