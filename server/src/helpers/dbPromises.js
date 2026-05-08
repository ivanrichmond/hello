//@flow
import { currentUser, users } from '../db';
import type { StandardReturn } from '../helpers/hello'
import * as Types from '../types'

// -- currentUser
export const promiseDeleteCurrentUser = (): Promise<StandardReturn> => {
    return new Promise((resolve) => {
        // There should be only one record, so delete everything.
        currentUser.remove({}, { multi: true }, (error, removed) => {
            if(error){
                resolve({ error, payload: '' })
            } else {
                resolve({ error: null, payload: removed})
            }
        })
    })
}

export const promiseGetCurrentUser = (): Promise<StandardReturn> => {
    return new Promise((resolve) => {
        try {
            currentUser.find({}, (error, doc) => {
                if (error) {
                    resolve({ error, payload: '' });
                } else {
                    const result = {
                        payload: {
                            createdAt: doc[0]?.createdAt,
                            name: doc[0]?.name,
                            password: doc[0]?.password,
                            username: doc[0]?.username,
                            _id: doc[0]?._id,
                        },
                        error: null,
                    };
                    resolve(result);
                }
            });
        } catch (error) {
            resolve({ error, payload: '' });
        }
    });
};

export const promiseUpdateCurrentUser = (user: Types.UserInput): Promise<StandardReturn>  => {
    return new Promise((resolve) => {
        // First, see if currentUser has anything in it.
        currentUser.find({}, function (error, docs) {
            if(error){
                resolve({ error, payload: '' })
            } else {
                // Is currentUser already assigned?
                if(docs?.length){
                    // If so, replace it with the the new record.
                    currentUser.update({}, user, {}, (error, replaced) => {
                        if(error){
                            resolve({ error, payload: '' })
                        } else {
                            const result = {
                                payload: {
                                    name: user?._id || '',
                                    name: user?.name || '',
                                    username: user?.username || '',
                                    createdAt: user?.createdAt,
                                },
                                error: null,
                            }
                            resolve(result)
                        }
                    })
                } else {
                    // If not, insert it.
                    currentUser.insert(user, (error, doc) => {
                        if(error){
                            resolve({ error, payload: '' })
                        } else {
                            const result = {
                                payload: {
                                    name: doc?._id || '',
                                    name: doc?.name || '',
                                    username: doc?.username || '',
                                    createdAt: doc?.createdAt,
                                },
                                error: null,
                            }
                            resolve(result)
                        }
                    })
                }
            }
        })
    })
}

// -- users
export const promiseDeleteUser = (id: String): Promise<StandardReturn> => {
    return new Promise((resolve) => {
        users.remove({_id: id}, (error, removed) => {
            if(error){
                resolve({ error, payload: '' })
            } else {
                const result = {
                    payload: {id, removed},
                    error: null,
                }
                resolve(result)
            }
        })
    })
}

export const promiseFindUsers = (query: Types.UserInput): Promise<StandardReturn> => {
    return new Promise((resolve) => {
        users.find(query, function (error, docs) {
            if(error){
                resolve({ error, payload: '' })
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
                    error: null,
                }
                resolve(result)
            }
        })
    })
}

export const promiseGetUser = (id: String): Promise<StandardReturn> => {
    return new Promise((resolve) => {
        users.find({_id: id}, function (error, docs) {
            if(error){
                resolve({ error, payload: '' })
            } else {
                const result = {
                    payload: {
                        _id: docs[0]?._id || '',
                        name: docs[0]?.name || '',
                        username: docs[0]?.username || '',
                        createdAt: docs[0]?.createdAt,
                    },
                    error: error || null,
                }
                resolve(result)
            }
        })
    })
}

export const promiseInsertUser = (newUser: Types.UserInput): Promise<StandardReturn> => {
    return new Promise((resolve) => {
        users.insert(newUser, (error, doc) => {
            if(error){
                resolve({ error, payload: '' })
            } else {
                const result = {
                    payload: {
                        _id: doc?._id || '',
                        name: doc?.name || '',
                        username: doc?.username || '',
                        createdAt: doc?.createdAt || newUser.createdAt,
                    },
                    error: error || null,
                }
                resolve(result)
            }
        })
    })
}

export const promiseUpdateUser = (user: Types.UserInput): Promise<StandardReturn> => {
    return new Promise((resolve) => {
        // If password was blank, keep it as is.
        if(!user?.password){
            const originalUser = users.find({_id: user?._id}, {}, (error, docs) => {
                if(docs?.length){
                    user.password = docs[0]?.password
                }
            })
        }

        users.update({_id: user._id}, user, {}, (error, replaced) => {
            const updatedUser = {...user}
            delete updatedUser.password
            if(error){
                resolve({ error, payload: '' })
            } else {
                const result = {
                    error: null,
                    payload: updatedUser,
                }
                resolve(result)
            }
        })
    })
}

export const promiseValidateUser = (user: Types.ValidateUserInput): Promise<StandardReturn> => {
    return new Promise((resolve) => {
        users.find({username: user?.username, password: user?.password}, function (error, docs) {
            if(error){
                resolve({ error, payload: '' })
            } else {
                if(docs?.length){
                    resolve({error: null, payload: true})
                } else {
                    resolve({error: null, payload: false})
                }
            }
        })
    })
}
