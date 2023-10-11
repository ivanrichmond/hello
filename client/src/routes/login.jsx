import { Form as UIForm, Input } from 'semantic-ui-react'
import React from 'react'
import { 
    Form, 
} from "react-router-dom";

import AppButton from '../styleLibrary/AppButton'

export default function Login() {
    return (
        <div id="Login">
            <Form method="post" className="ui form">
                <UIForm.Group inline>
                    <label htmlFor="username">
                        Username:
                    </label>
                    <UIForm.Input type="text" name='username' />
                    <UIForm.Button inline primary type="submit">Login</UIForm.Button>
                </UIForm.Group>
            </Form>
        </div>
    );
}
