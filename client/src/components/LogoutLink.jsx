import React from 'react'
import { Link } from 'react-router-dom'

const LogoutLink = () => {
    return (
        <Link className = 'LogoutLink' to = '/logout' >
        logout
        </Link>
    )
}

export default LogoutLink