import { currentUser, users } from '../db';

export const promiseInsertUser = (newUser => {
    return new Promise((resolve) => {
        users.insert(newUser, (error, docs) => {
            const result = {
                _id: docs?._id || '',
                name: docs?.name || '',
                username: docs?.username || '',
                createdAt: docs?.createdAt || newUser.createdAt,
                error: error || '',
            }
            resolve(result)
        })
    })
})