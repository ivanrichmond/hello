import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthProvider'

const Logout = () => {
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)
    useEffect(() => {
        logout()
        navigate('/')
    }, [logout, navigate])

    return (<></>)
}

export default Logout

