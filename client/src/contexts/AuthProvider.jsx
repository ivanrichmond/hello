import _ from 'lodash'
import { createContext, useContext, useMemo } from 'react';

import { 
  useAddUserMutation,
  useDeleteUserMutation,
  useGetCurrentUserQuery, 
  useGetUsersQuery, 
  useSetCurrentUserMutation,
  useUpdateUserMutation,
} from '../features/api/apiSlice'

// Contexts
import { NoticeContext } from './NoticeProvider';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { createNotice } = useContext(NoticeContext)
  const { 
    data: currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    error: currentUserError, 
  } = useGetCurrentUserQuery()

  if(isCurrentUserError) {
    createNotice(currentUserError, 'error')
  }

  const isLoggedIn = useMemo(() => !_.isEmpty(currentUser), [currentUser])

  const [addUser, { isLoading: isAddUserLoading }] = useAddUserMutation()
  const [setCurrentUser] = useSetCurrentUserMutation()
  const { 
    data: users, 
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError, 
  } = useGetUsersQuery()
  const [ deleteUser ] = useDeleteUserMutation()
  const [ updateUser ] = useUpdateUserMutation()

  // call this function when you want to authenticate the currentUser
  const login = async (user) => {
    setCurrentUser(user)
  };

  // call this function to sign out logged in currentUser
  const logout = () => {
    setCurrentUser({})
    // redirect("/login");
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
    addUser, 
    currentUser,
    currentUserError,
    deleteUser, 
    isAddUserLoading,
    isCurrentUserLoading,
    isLoggedIn,
    isUsersError,
    isUsersLoading,
    login,
    logout,
    updateUser,
    users,
    usersError, 
    validateUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};