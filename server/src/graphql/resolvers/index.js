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
    promiseValidateUser,
} from '../../helpers/dbPromises'
import type { StandardReturn } from '../../helpers/hello'
import * as Types from '../../types'

export const resolvers = {
    Query: {
        apiStatus: (): { status: string } => {
            return { status: 'The API is working correctly.' }
        },
        findUsers: async (parent: any, args: {input: UserInput, ...}): Promise<StandardReturn> => {
            return(await promiseFindUsers(args?.input))
        }, 
        getCurrentUser: async (): Promise<StandardReturn> => {
            return(await promiseGetCurrentUser())
        }, 
        getUser: async (parent: any, args: {input: String, ...}): Promise<StandardReturn> => {
            return(await promiseGetUser(args.input))
        }, 
        validateUser: async (parent: any, args: {input: Types.ValidateUserInput, ...}): Promise<StandardReturn> => {
            return(await promiseValidateUser(args.input))
        }
    },
    Mutation: {
        createUser: async (parent: any, args: {input: UserInput, ...}): Promise<StandardReturn> => {
            const newUser = new User(
                args.input?.name || '',
                args.input?.username || '',
                args.input?.password || '',
            )
            return( await promiseInsertUser(newUser) )
        },
        deleteCurrentUser:  async (): Promise<StandardReturn> => {
            return( await promiseDeleteCurrentUser() )
        },
        deleteUser: async (parent: any, args: {input: String, ...}): Promise<StandardReturn> => {
            return( await promiseDeleteUser(args.input) )
        },
        updateCurrentUser: async (parent: any, args: {input: UserInput, ...}): Promise<StandardReturn> => {
            return( await promiseUpdateCurrentUser(args.input) )
        },
        updateUser: async (parent: any, args: {input: UserInput, ...}): Promise<StandardReturn> => {
            const updatedUser = new User(
                args.input?.name || '',
                args.input?.username || '',
                args.input?.password || '',
            )
            // But, by design, User does not include _id, since it is added laster, so add it back.
            updatedUser._id = args.input?._id
            return( await promiseUpdateUser(updatedUser) )
        },
    }
}