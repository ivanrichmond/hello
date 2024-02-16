import { User } from '../../classes/users'
import { promiseInsertUser } from '../../helpers/dbPromises'

export const resolvers = {
    // In RTK Query: 
    // addUser deleteCurrentUser deleteUser getCurrentUser getUser getUsers updateUser updateCurrentUser  
    Query: {
        apiStatus: (parent, args, context, info) => {
            return { status: 'The API is working correctly.' }
        }
    },
    Mutation: {
        // RTK Query = addUser
        createUser: async (parent, args, context, info) => {
            const newUser = new User(
                args.input?.name || '',
                args.input?.username || '',
                args.input?.password || '',
            )
            const result = await promiseInsertUser(newUser)
            return(result)
        },
    }
}