import _ from 'lodash'
import { createContext, useContext, useMemo } from 'react';

import { 
  useAddUserMutation,
  useDeleteUserMutation,
  useGetCurrentUserQuery, 
  useGetUsersQuery, 
  useUpdateCurrentUserMutation,
  useUpdateUserMutation,
} from '../features/api/apiSlice'
import { makeUser } from '../data/users';

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
  const [updateCurrentUser] = useUpdateCurrentUserMutation()
  const { 
    data: users, 
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError, 
  } = useGetUsersQuery()
  const [ deleteUser ] = useDeleteUserMutation()
  const [ updateUser ] = useUpdateUserMutation()

  // Create a new user, using makeUser and addUser.
  const createUser = async () => {
    const user = makeUser();
    await addUser(user);
    return user
  }

  const isUniqueUsername = user => {
    let instances = 0
    users.forEach(u => {
      if(u.username === user.username){
        instances++
      }
    })
    return instances < 1
  }

  // call this function when you want to authenticate the currentUser
  const login = async (user) => {
    await updateCurrentUser(user)
  };

  // call this function to sign out logged in currentUser
  const logout = async () => {
    await updateCurrentUser({})
  }

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
    createUser, 
    currentUser,
    currentUserError,
    deleteUser, 
    isAddUserLoading,
    isCurrentUserLoading,
    isLoggedIn,
    isUniqueUsername,
    isUsersError,
    isUsersLoading,
    login,
    logout,
    updateCurrentUser,
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