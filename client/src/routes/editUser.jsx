import { useContext, useState } from 'react'
import { 
    redirect,
    useNavigate,
    useParams,
} from "react-router-dom";

import AppButton from '../styleLibrary/AppButton'
import AppGrid from '../styleLibrary/AppGrid'
import AppInput from '../styleLibrary/AppInput'
import AppLoader from '../styleLibrary/AppLoader';
// import { AuthContext } from '../contexts/AuthProvider'
import { useGetCurrentUserQuery, useUpdateUserMutation } from '../features/api/apiSlice'

import { useGetUserQuery } from '../features/api/apiSlice';
import { useNotice } from '../contexts/NoticeProvider'

export default function EditUser() {
  const { id } = useParams()
  const { createNotice } = useNotice()

  let { data: user, isLoading, isError, error  } = useGetUserQuery(id)
  if(isError){
    createNotice(error?.message, 'error')
  }

  const { updateUser } = useUpdateUserMutation()

  const { 
    data: currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    error: currentUserError, 
  } = useGetCurrentUserQuery()
  if(isCurrentUserError){
    createNotice(currentUserError?.message, 'error')
  }
  
  // const { currentUser, isLoggedIn, setCurrentUser } = useContext(AuthContext)
  if(!user) createNotice(`User ${id} not found.`, 'error');
  const [newUser, setNewUser] = useState(user)
  const navigate = useNavigate();
  const loggedIn = !!currentUser
  // Whether you're editing yourself.
  const isYou = currentUser && currentUser?.id === user?.id
  const heading = loggedIn ? 'Edit User' : 'Create Account'

  // This is only used as an adjunct to action, in order to update AuthContext.
  const handleSubmit = (e) => {
    if(isYou) updateUser(newUser)
    if(loggedIn){
      if(isYou){
        // If this is the user's own record, send them back home.
        return redirect(`/`);
      } else {
        // If not, they must have come from /admin, so return them.
        return redirect(`/admin`);
      }
    } else {
      // The user just created a new account, send them to login form.
      return redirect(`/login`)
    }
  }

  return isLoading || isCurrentUserLoading ? 
    (<AppLoader />)
    : 
    (
    <form method="post" id="user-form" onSubmit={e => handleSubmit(e)}>
      <h1>{heading}</h1>
      <AppGrid>
        <AppGrid.Row>
          <AppGrid.Column>
            <label htmlFor={'name'}>Name: </label>
          </AppGrid.Column>
          
          <AppGrid.Column>
            <AppInput
              aria-label="Name"
              defaultValue={user?.name || ''}
              id="name"
              name="name"
              onChange = {
                e => setNewUser(Object.assign(newUser, {name: e.target.value}))
              }
              placeholder="Name"
              type="text"
            />
          </AppGrid.Column>
        </AppGrid.Row>
        <AppGrid.Row>
          <AppGrid.Column>
            <label htmlFor={'username'}>Username: </label>
          </AppGrid.Column>
          
          <AppGrid.Column>
            <AppInput
              aria-label="username"
              defaultValue={user?.username || ''}
              id="username"
              name="username"
              onChange = {
                e => setNewUser(Object.assign(newUser, {username: e.target.value}))
              }
              placeholder="username"
              type="text"
            />
          </AppGrid.Column>
        </AppGrid.Row>
        <AppGrid.Row>
          <AppGrid.Column>
            <label htmlFor={'password'}>Password: </label>
          </AppGrid.Column>
          
          <AppGrid.Column>
            <AppInput
              aria-label="password"
              defaultValue={user?.password || ''}
              id="password"
              name="password"
              onChange = {
                e => setNewUser(Object.assign(newUser, {password: e.target.value}))
              }
              placeholder="password"
              type="password"
            /> 
          </AppGrid.Column>
        </AppGrid.Row>
        <AppGrid.Row>
          <AppGrid.Column>
            <AppButton
            color = "green"
            type="submit"
            >
              Save
            </AppButton>
          </AppGrid.Column>

          <AppGrid.Column>
            <AppButton 
            color = "red"
            type="button"
            onClick={() => {
                navigate(-1)
            }}
            >
              Cancel
            </AppButton>
          </AppGrid.Column>
        </AppGrid.Row>
      </AppGrid>
    </form>
  );
}