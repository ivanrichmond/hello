//@flow
import type { UserInput } from "../../types";

import { User } from '../../classes/users'
import {
    promiseDeleteCurrentUser,
    promiseGetCurrentUser,
    promiseUpdateCurrentUser,
    promiseDeleteUser,
    promiseFindUsers,
    promiseGetUser,
    promiseInsertUser,
    promiseUpdateUser,
} from '../../helpers/dbPromises'
import * as Types from '../../types'

export const resolvers = {
    Query: {
        apiStatus: (): { status: string } => {
            return { status: 'The API is working correctly.' }
        },
        findUsers: async (parent: UserInput, args: {input: UserInput, ...}): Promise<> => {
            // BUG: args is coming in as undefined, so there's no args.input.
            return(await promiseFindUsers(args?.input))
        }, 
        getCurrentUser: async (): Promise<> => {
            return(await promiseGetCurrentUser())
        }, 
        getUser: async (parent: String, args: {input: String, ...}): Promise<> => {
            return(await promiseGetUser(args.input))
        }, 
    },
    Mutation: {
        createUser: async (parent: empty, args: {input: UserInput, ...}): Promise<> => {
            const newUser = new User(
                args.input?.name || '',
                args.input?.username || '',
                args.input?.password || '',
            )
            return( await promiseInsertUser(newUser) )
        },
        deleteCurrentUser:  async (): Promise<> => {
            return( await promiseDeleteCurrentUser() )
        },
        deleteUser: async (parent: String, args: {input: String, ...}): Promise<> => {
            return( await promiseDeleteUser(args.input) )
        },
        updateCurrentUser: async (parent: empty, args: {input: UserInput, ...}): Promise<> => {
            const newUser = new User(
                args.input?.name || '',
                args.input?.username || '',
                args.input?.password || '',
            )
            return( await promiseUpdateCurrentUser(newUser) )
        },
        updateUser: async (parent: empty, args: {input: UserInput, ...}): Promise<> => {
            const updatedUser = new User(
                args.input?.name || '',
                args.input?.username || '',
                args.input?.password || '',
            )
            return( await promiseUpdateCurrentUser(updatedUser) )
        },
    }
}