import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthProvider'

const UserSettingsLink = () => {
    const {currentUser} = useContext(AuthContext)
    return (
        <Link
        className = 'UpperRightLink' 
        to = {`/users/${currentUser?.id}/edit`}
        >
            User Settings
        </Link>
    )
}

export default UserSettingsLink