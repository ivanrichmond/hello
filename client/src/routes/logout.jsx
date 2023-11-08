//TODO: Should I consolidate destroyUser into user?
import { useAuth } from '../contexts/AuthProvider'

const Logout = () => {
    const { logout } = useAuth()
    logout()
    return null
}

export default Logout

