export const typeDefs = `#graphql

    type Query {
        apiStatus: ApiStatus
    }

    type Mutation {
        createUser(input: UserInput): User
    }

    type ApiStatus {
        status: String
    }

    type User {
        _id: String,
        name: String
        username: String,
        createdAt: Float,
        error: String,
    }
    
    input UserInput {
        name: String
        username: String,
        password: String,
        createdAt: Float,
    }

`