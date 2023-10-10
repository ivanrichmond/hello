import { 
    Form, 
} from "react-router-dom";

export default function Login() {
    return (
        <div id="Login">
            <h1>Login</h1>

            <div>
                <Form method="post" >
                    <label htmlFor="username">
                        Username:
                        <input type="text" name='username' />
                    </label>
                    <button type="submit">Login</button>
                </Form>
            </div>
        </div>
    );
}
