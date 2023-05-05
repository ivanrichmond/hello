import React from 'react';

const Login = () => {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isError, setIsError] = React.useState(false);

    const validateUser = () => {
        console.log(userName, password);
        if(userName === '' && password === ''){
            setIsError(true);
        } else {
            setIsError(false);
        }
    }

    return (
        <div className = 'LoginIntuit'>
            {isError &&
                <div>Incorrect username or password.</div>
            }
            <label htmlFor="username">Username or email address</label>
            <input type="text" name="username" id="username" onChange={(_e) => setUserName(_e.target.value)} />
            <label htmlFor="username">Password</label>
            <input type="password" name="password" id="password" onChange={(_e) => setPassword(_e.target.value)} />
            <input type="submit" value="Sign In" onClick={validateUser} />
        </div>
    )
}

export default Login;