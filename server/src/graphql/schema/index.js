export const typeDefs = `#graphql

    type Query {
        apiStatus: ApiStatus,
        findUsers(input: UserInput): Users,
        getCurrentUser: UserReturn,
        getUser(input: String): UserReturn,
        validateUser(input: ValidateUserInput): ValidateUserReturn
    }

    type Mutation {
        createUser(input: UserInput): UserReturn,
        deleteCurrentUser: Deleted,
        deleteUser(input: String): Deleted,
        updateCurrentUser(input: UserInput): UserReturn,
        updateUser(input: UserInput): UserReturn,
    }

    type ApiStatus {
        status: String
    }

    type Deleted {
        id: String,
        removed: Int,
        error: String
    }

    type User {
        _id: String,
        name: String,
        username: String,
        createdAt: Float,
    }
    
    input UserInput {
        _id: String,
        name: String,
        username: String,
        password: String,
        createdAt: Float,
    }

    type UserReturn {
        error: String,
        payload: User,
    }

    type Users {
        payload: [User],
        error: String,
    }

    input ValidateUserInput {
        username: String!,
        password: String!,
    }

    type ValidateUserReturn {
        error: String,
        payload: Boolean
    }

`