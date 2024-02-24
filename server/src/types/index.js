//@flow
export type User = {
    name?: String,
    username?: String,
    password?: String,
    createdAt?: Number | String,
}

export type UserInput = {
    _id?: String,
    name?: String,
    username?: String,
    password?: String,
    createdAt?: Number | String,
}

export type UserReturn =  {
    error?: String,
    payload?: User,
}

export type ValidateUserInput = {
    username: String,
    password: String,
}