import { Form as AppForm } from 'semantic-ui-react'
import React, { useContext, useRef } from 'react'
import { 
    useNavigate
} from "react-router-dom";

import { createUser } from '../data/users.js'
// import { useAuth } from '../contexts/AuthProvider'
import { AuthContext } from '../contexts/AuthProvider'
import { validateUser } from '../data/users.js'

//TODO: The line below isn't working, whereas the one above does.
// import AppForm from '../styleLibrary/AppForm'


export default function Login() {
    const navigate = useNavigate()
    // const { login } = useAuth()
    const usernameRef = useRef('')
    const passwordRef = useRef('')
    const value = useContext(AuthContext)
    console.debug('value',value)
    const login = value?.login

    async function handleSubmit() {
        const username = usernameRef.current
        const password = passwordRef.current
        const user = await validateUser(username, password)
        if( user ){
            login(user)
            navigate('/')
        } else {
            console.error(`Invalid username or password.`)
        }
    }

    async function createAccount() {
        const user = await createUser();
        if(user){
            navigate(`/users/${user.id}/edit`);
        } else {
            throw Error("Sorry, something went wrong and the new account was not created.")
        }
    }

    return (
        <div id="Login">
            <AppForm name='login' method="post" action="">
                <AppForm.Group inline>
                    <label htmlFor="username">
                        Username:
                    </label>
                    <AppForm.Input
                    autoFocus
                    focus
                    id='username'
                    name='username'
                    ref={usernameRef}
                    />
                    <label htmlFor="password">
                        Password:
                    </label>
                    <AppForm.Input
                    name='password'
                    type="password"
                    />
                    <AppForm.Button
                    inline
                    onClick = {e => handleSubmit()}
                    primary
                    type="button"
                    >
                        Login
                    </AppForm.Button>
                    <AppForm.Button
                    inline
                    onClick = {() => createAccount()}
                    secondary
                    type="button"
                    >
                        Create Account
                    </AppForm.Button>
                </AppForm.Group>
            </AppForm>
        </div>
    );
}
