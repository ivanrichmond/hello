export const typeDefs = `#graphql

    type Query {
        apiStatus: ApiStatus,
        findUsers(input: UserInput): Users,
        getCurrentUser: User,
        getUser(input: String): User,
    }

    type Mutation {
        createUser(input: UserInput): User,
        deleteCurrentUser: Deleted,
        deleteUser(input: String): Deleted,
        updateCurrentUser(input: UserInput): User,
        updateUser(input: UserInput): User,
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
        error: String,
    }
    
    input UserInput {
        name: String,
        username: String,
        password: String,
        createdAt: Float,
    }

    type Users {
        users: [User],
        error: String,
    }

`