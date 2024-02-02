import { createContext, useContext, useMemo } from 'react';
import _ from 'lodash'

import { 
  useAddUserMutation,
  useDeleteCurrentUserMutation,
  useDeleteUserMutation,
  useGetCurrentUserQuery, 
  useGetUsersQuery, 
  useUpdateCurrentUserMutation,
  useUpdateUserMutation,
} from '../features/api/apiSlice'
import { makeUser, nextUserId } from '../data/users';

// Contexts
import { NoticeContext } from './NoticeProvider';
import { useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { createNotice } = useContext(NoticeContext)
  let { 
    data: currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    error: currentUserError, 
  } = useGetCurrentUserQuery()

  useEffect(() => {
    if(!isCurrentUserLoading && isCurrentUserError && currentUserError) {
      createNotice(
        currentUserError?.status + ' ' + 
        currentUserError?.error + ' ' + 
        currentUserError?.message || '',
       'error'
      )
    }
  // If eslint has its way, and we put in [createNotice], this keeps firing.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrentUserError, currentUserError, isCurrentUserLoading])

  const isLoggedIn = useMemo(() => !_.isEmpty(currentUser), [currentUser])

  const [addUser, { isLoading: isAddUserLoading }] = useAddUserMutation()
  const [updateCurrentUser] = useUpdateCurrentUserMutation()
  const [deleteCurrentUser] = useDeleteCurrentUserMutation()
  const { 
    data: users, 
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError, 
  } = useGetUsersQuery()

  useEffect(() => {
    if(!isUsersLoading && isUsersError){
      createNotice(usersError, 'error')
    }
  // If eslint has its way, and we put in [createNotice], this keeps firing.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUsersError, isUsersLoading, usersError])

  const [ deleteUser ] = useDeleteUserMutation()
  const [ updateUser ] = useUpdateUserMutation()

  // Create a new user, using makeUser and addUser.
  const createUser = async () => {
    const user = makeUser();
    await addUser(user);
    return user
  }

  const isUniqueUsername = user => {
    if(user?.id > nextUserId){
      let instances = 0
      users.forEach(u => {
        if(u.username === user.username){
          instances++
        }
      })
      return instances < 1
    } else {
      // It's an existing user, so we don't need to care.
      return true
    }
  }

  // call this function when you want to authenticate the currentUser
  const login = async (user) => {
    await updateCurrentUser(user)
  };

  // call this function to sign out logged in currentUser
  const logout = async () => {
    await deleteCurrentUser()
  }

  const validateUser = (username, password) => {
    if(!username || !password) {
      console.error(`Bad parameters passed to validateUser()`)
      return false
    }

    if(_.isEmpty(users)){
      // Error will already have been handled, above.
      return false
    }

    // Find user with that username, or else return false.
    // TODO: Redo this in apiSlice, so that RTK Query can handle this search.
    const user = users?.find(e => e.username === username)
  
    if(user && user?.password === password){
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