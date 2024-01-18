import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthProvider'
//TODO: Delete next line, once I can use AuthContext.
import { useSetCurrentUserMutation } from '../features/api/apiSlice'

const Logout = () => {
    const [setCurrentUser] = useSetCurrentUserMutation()
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)
    useEffect(() => {
        // //TODO: Replace next line with logout(), once I can use AuthContext again.
        logout()
        navigate('/')
    }, [logout, navigate, setCurrentUser])

    return (<></>)
}

export default Logout

