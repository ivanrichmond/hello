import React from 'react';

const Login = () => {
    const users = [{ username: 'joe', password: 'J03' }];

    let userNameRef = React.useRef();
    let passswordRef = React.useRef();

    const authenticate = (_e) => {
        const username = userNameRef.current.value;
        const password = passswordRef.current.value;
        if( users.find(element => element.username === username && element.password === password) ){
            alert("Authenticated!")
        } else {
            alert("Your username and password aren't recognized :(")
        }
    }

    return (
        <div>
            <form action="">
                <input type="text" name="username" id="username" ref={userNameRef}/>
                <input type="password" name="password" id="password" ref={passswordRef}/>
                <input type="submit" value="Login" 
                onClick = {authenticate}
                />
            </form>
        </div>
    )
}

export default Login;