import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

const Logout = () => {
    const { logout } = useContext(AuthContext)
    logout()
}

export default Logout

