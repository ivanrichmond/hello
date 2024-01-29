import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthProvider'
//TODO: Delete next line, once I can use AuthContext.
import { useUpdateCurrentUserMutation } from '../features/api/apiSlice'

const Logout = () => {
    const [updateCurrentUser] = useUpdateCurrentUserMutation()
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)
    useEffect(() => {
        logout()
        navigate('/')
    }, [logout, navigate, updateCurrentUser])

    return (<></>)
}

export default Logout

