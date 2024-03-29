import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

// import { AuthContext } from '../contexts/AuthProvider'
import AppLoader from '../styleLibrary/AppLoader'
import { AuthContext } from '../contexts/AuthProvider'

const UserSettingsLink = () => {
    const {
        currentUser,
        isCurrentUserLoading,
    } = useContext(AuthContext)

    return (
        isCurrentUserLoading ?
        <AppLoader />
        :
        (
        <Link
        className = 'UpperRightLink' 
        to = {`/users/${currentUser?._id}/edit`}
        >
            User Settings
        </Link>
        )
    )
}

export default UserSettingsLink