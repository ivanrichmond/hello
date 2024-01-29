import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

// import { AuthContext } from '../contexts/AuthProvider'
import { useGetCurrentUserQuery } from '../features/api/apiSlice'
import AppLoader from '../styleLibrary/AppLoader'
import { NoticeContext } from '../contexts/NoticeProvider'

const UserSettingsLink = () => {
    // const {currentUser} = useContext(AuthContext)
    const { createNotice } = useContext(NoticeContext)
    const { 
        data: currentUser,
        isLoading: isCurrentUserLoading,
        isError,
        error 
    } = useGetCurrentUserQuery()

    if(isError) {
        createNotice(error, 'error')
    }

    return (
        isCurrentUserLoading ?
        <AppLoader />
        :
        (
        <Link
        className = 'UpperRightLink' 
        to = {`/users/${currentUser?.id}/edit`}
        >
            User Settings
        </Link>
        )
    )
}

export default UserSettingsLink