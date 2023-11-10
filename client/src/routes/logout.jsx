import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

const Logout = () => {
    const { logout } = useContext(AuthContext)
    logout()
    return null
}

export default Logout

