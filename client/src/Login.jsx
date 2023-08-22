import React, {useContext} from 'react'
import { useLocation, useNavigate } from 'react-router'

import { AuthContext } from './App'

export default function Login() {
//   const [user, setUser] = useContext(AuthContext)
  const [user, setUser] = React.useState(null)
//   const location = useLocation()
//   const navigate = useNavigate()

  return (
    <form onSubmit={() => {
        if (user.loggedIn) return
        setUser({ loggedIn: true })

        // if(location.state?.from){
        //     navigate(location.state.from)
        // }
    }}>
      <input
        placeholder="Tell me your name."
        required="required"
        onChange={e => setUser(e.target.value)}
        value={user}
      />
      <button type="button"  >
        Login
      </button>
      <button type="button" onClick = {() => {
          if (!user.loggedIn) return
          setUser({ loggedIn: false })
      }} >
        Logout
      </button>
    </form>
  )
}