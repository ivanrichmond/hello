import {
    User,
    makeUser,
    validateUser,
} from './users.js'

const user = new User(1, 'Dude', 'dude', 'abides')

test('can create a User object',() => {
    // id, name = null, username = null, password = null
    expect(user.id).toEqual(1)
    expect(user.name).toEqual('Dude')
    expect(user.username).toEqual('dude')
    expect(user.password).toEqual('abides')
})

test('can create user',() => {
    const newUser = makeUser()
    expect(newUser).not.toBe(null)
    expect(newUser).toBeDefined()
})

test('can validate user',() => {
    const result = validateUser('dude', 'abides')
    expect(result).not.toBeFalsy()
})

