import { Form as AppForm } from 'semantic-ui-react'
import React from 'react'
import { 
    Form, useNavigate
} from "react-router-dom";

import { createUser } from '../data/users.js'

//TODO: The line below isn't working, whereas the one above does.
// import AppForm from '../styleLibrary/AppForm'

export default function Login() {
    const navigate = useNavigate()

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
            <Form method="post" className="ui form">
                <AppForm.Group inline>
                    <label htmlFor="username">
                        Username:
                    </label>
                    <AppForm.Input focus autoFocus name='username' id='username' />
                    <label htmlFor="password">
                        Password:
                    </label>
                    <AppForm.Input type="password" name='password' />
                    <AppForm.Button inline primary type="submit">Login</AppForm.Button>
                    <AppForm.Button inline secondary type="button" onClick = {() => createAccount()}>
                        Create Account
                    </AppForm.Button>
                </AppForm.Group>
            </Form>
        </div>
    );
}
