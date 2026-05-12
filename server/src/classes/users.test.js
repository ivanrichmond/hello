import {
    User,
} from './users.js'


describe('new User', () => {
    test('can create a User object',() => {
        const user = new User('Dude', 'dude', 'abides')
        expect(user.name).toEqual('Dude')
        expect(user.username).toEqual('dude')
        expect(user.password).toEqual('abides')
    })
    
    test('can create a blank User object',() => {
        const user = new User()
        expect(user.name).toEqual('')
        expect(user.username).toEqual('')
        expect(user.password).toEqual('')
    })
})

