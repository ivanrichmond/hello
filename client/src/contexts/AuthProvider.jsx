import { createContext, useContext } from 'react';
import { redirect } from 'react-router-dom';

import { 
  useAddUserMutation,
  useGetCurrentUserQuery, 
  useGetUsersQuery, 
  useSetCurrentUserMutation,
} from '../features/api/apiSlice'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: currentUser } = useGetCurrentUserQuery()
  const [addUser] = useAddUserMutation()
  const [setCurrentUser] = useSetCurrentUserMutation()
  const { data: users } = useGetUsersQuery()

  // call this function to find out if the currentUser is logged in, without
  // getting the entire currentUser object.
  const isLoggedIn = () => {
    return !!currentUser
  }

  // call this function when you want to authenticate the currentUser
  const login = async (user) => {
    setCurrentUser(user)
  };

  // call this function to sign out logged in currentUser
  const logout = () => {
    setCurrentUser({})
    redirect("/login");
  };

  const validateUser = (username, password) => {
    if(!username || !password) {
      console.error(`Bad parameters passed to validateUser()`)
      return false
    }

    // TODO: Redo this in apiSlice, so that RTK Query can handle this search.
    // Find user with that username, or else return false.
    const user = users.find(e => e.username === username)
  
    if(user && user.password === password){
      return user
    } else {
      return false
    }
  }

  const value = {
    addUser, // TODO: Should this be in a separate context?
    currentUser,
    isLoggedIn,
    login,
    logout,
    validateUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};