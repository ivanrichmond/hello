// import { Form as AppForm } from 'semantic-ui-react'
import React, { useContext, useState } from 'react'
import { 
    useNavigate
} from "react-router-dom";

import { createUser } from '../data/users.js'
import { AuthContext } from '../contexts/AuthProvider'
import { useNotice } from '../contexts/NoticeProvider'
import { validateUser } from '../data/users.js'

//TODO: The line below isn't working, whereas the one above does.
import AppForm from '../styleLibrary/AppForm'

export default function Login() {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const { createNotice, deleteNotice } = useNotice()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit() {
        const user = await validateUser(username, password)
        if( user ){
            login(user)
            deleteNotice()
            navigate('/')
        } else {
            createNotice(`Invalid username or password.`, 'error')
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
                    onChange = {e => setUsername(e.target.value)}
                    />
                      
                    <label htmlFor="password">
                        Password:
                    </label>
                    <AppForm.Input
                    name='password'
                    onChange = {e => setPassword(e.target.value)}
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
