import React from 'react'
import { Link } from 'react-router-dom'

const LogoutLink = () => {
    return (
        <Link 
        className = 'UpperRightLink' 
        to = '/logout' 
        >
            Logout
        </Link>
    )
}

export default LogoutLink