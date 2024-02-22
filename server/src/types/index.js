//@flow
export type UserInput = {
    _id?: String,
    name?: String,
    username?: String,
    password?: String,
    createdAt?: Number | String,
}

export type UserReturn =  {
    _id?: String,
    name?: String,
    username?: String,
    createdAt?: Number | String,
    error?: String,
}

export type ValidateUserInput = {
    username: String,
    password: String,
}