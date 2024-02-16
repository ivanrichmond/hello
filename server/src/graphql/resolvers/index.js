import { currentUser, users } from '../../db';
import { User } from '../../classes/users'

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

export const resolvers = {
    Query: {
        apiStatus: (parent, args, context, info) => {
            return { status: 'The API is working correctly.' }
        }
    },
    Mutation: {
        createUser: async (parent, args, context, info) => {
            const newUser = new User(
                args.input?.name || '',
                args.input?.username || '',
                args.input?.password || '',
            )
            const result = await promiseInsertUser(newUser)
            return(result)
        }
    }
}