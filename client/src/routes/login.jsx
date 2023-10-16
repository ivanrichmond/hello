import { Form as AppForm } from 'semantic-ui-react'
import React from 'react'
import { 
    Form, 
} from "react-router-dom";

//TODO: The line below isn't working, whereas the one above does.
// import AppForm from '../styleLibrary/AppForm'

export default function Login() {
    return (
        <div id="Login">
            <Form method="post" className="ui form">
                <AppForm.Group inline>
                    <label htmlFor="username">
                        Username:
                    </label>
                    <AppForm.Input focus autofocus name='username' id='username' />
                    <label htmlFor="password">
                        Password:
                    </label>
                    <AppForm.Input type="password" name='password' />
                    <AppForm.Button inline primary type="submit">Login</AppForm.Button>
                </AppForm.Group>
            </Form>
        </div>
    );
}
