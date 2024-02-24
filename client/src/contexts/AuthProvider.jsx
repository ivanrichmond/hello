import { createContext, useContext, useMemo } from 'react';
import _ from 'lodash'

import { 
  useAddUserMutation,
  useDeleteCurrentUserMutation,
  useDeleteUserMutation,
  useGetCurrentUserQuery, 
  useGetUsersQuery, 
  useIsUserValidMutation,
  useUpdateCurrentUserMutation,
  useUpdateUserMutation,
} from '../features/api/apiSlice'

// Contexts
import { NoticeContext } from './NoticeProvider';
import { useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { createNotice } = useContext(NoticeContext)
  let { 
    data: currentUserData,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    error: currentUserError, 
  } = useGetCurrentUserQuery()
  const currentUser = currentUserData?.getCurrentUser?.payload

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

  const isLoggedIn = useMemo(() => currentUser?._id, [currentUser])

  const [addUser, { isLoading: isAddUserLoading }] = useAddUserMutation()
  const [updateCurrentUser] = useUpdateCurrentUserMutation()
  const [deleteCurrentUser] = useDeleteCurrentUserMutation()
  const { 
    data: usersData, 
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError, 
  } = useGetUsersQuery()

  const [isUserValid] = useIsUserValidMutation()
  
  const users = usersData?.findUsers?.payload

  useEffect(() => {
    if(!isUsersLoading && isUsersError){
      createNotice(usersError, 'error')
    }
  // If eslint has its way, and we put in [createNotice], this keeps firing.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUsersError, isUsersLoading, usersError])

  const [ deleteUser ] = useDeleteUserMutation()
  const [ updateUser ] = useUpdateUserMutation()

  // Create a new user, using addUser.
  const createUser = async user => {
    await addUser(user);
    return user
  }

  const isUniqueUsername = user => {
    let instances = 0
    if(!user || _.isEmpty(user)) return false // Bad param
    if(!users || _.isEmpty(users)) return true // 1st one's unique
    users?.forEach(u => {
      if(u.username === user?.username){
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
    await deleteCurrentUser()
  }

  const validateUser = async (username, password) => {
    const response = await isUserValid( {username, password} )
    if(response?.data?.validateUser?.payload){
      // TODO: Figure out a way to use getUser() without violating the rules of hooks.
      // Or... have isUserValid / graphql validateUser return user object, if valid?
      const validatedUser = users.find(u => u.username === username)
      return validatedUser
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