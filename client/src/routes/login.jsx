import React, { useContext, useState } from 'react'
import { 
    useNavigate
} from "react-router-dom";

import { AuthContext } from '../contexts/AuthProvider'
import { useNotice } from '../contexts/NoticeProvider'

import AppForm from '../styleLibrary/AppForm'

export default function Login() {
    const navigate = useNavigate()
    const {
        createUser,
        isAddUserLoading,
        login,
        validateUser 
    } = useContext(AuthContext)
    
    const { createNotice, deleteNotice } = useNotice()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit() {
        const user = validateUser(username, password)
        if( user ){
            login(user)
            deleteNotice()
            navigate('/')
        } else {
            createNotice(`Invalid username or password.`, 'error')
        }
    }

    async function createAccount() {
        if(!isAddUserLoading){
            const user = await createUser()
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
