import {
    User,
} from './users.js'

const user = new User('Dude', 'dude', 'abides')

test('can create a User object',() => {
    // name = null, username = null, password = null
    expect(user.name).toEqual('Dude')
    expect(user.username).toEqual('dude')
    expect(user.password).toEqual('abides')
})

