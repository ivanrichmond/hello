import { useContext, useState } from 'react'
import { 
    useNavigate,
    useParams,
} from "react-router-dom";

import AppButton from '../styleLibrary/AppButton'
import AppGrid from '../styleLibrary/AppGrid'
import AppInput from '../styleLibrary/AppInput'
import AppLoader from '../styleLibrary/AppLoader';
import Notice from '../components/Notice'
import { AuthContext } from '../contexts/AuthProvider'
import { useNotice } from '../contexts/NoticeProvider'

export default function EditUser({isNew}) {
  const navigate = useNavigate();
  const { userId } = useParams()
  const { createNotice, deleteNotice, notice } = useNotice()
  if(!isNew && !userId) {
    createNotice(`Sorry, something went wrong.`, 'error')
    navigate(-1)
  }
  
  const {
    createUser,
    currentUser,
    currentUserError,
    isCurrentUserError,
    isCurrentUserLoading,
    isLoggedIn,
    isUniqueUsername,
    updateCurrentUser,
    updateUser,
    users,
  } = useContext(AuthContext)
  if(isCurrentUserError){
    createNotice(currentUserError?.message, 'error')
  }

  // TODO: Not scalable.  I need a better way to scale this.
  // I can't use RTK Query directly, because I can't put hooks under 
  // conditionals, and that might not help anyway.
  const user = isNew ? {} : users.find(u => u._id === userId)

  const [newUser, setNewUser] = useState(user)

  // Whether you're editing yourself.
  const isYou = currentUser && currentUser?._id === user?._id
  const heading = isNew ? 'Create Account' : 'Edit User'

  // This is only used as an adjunct to action, in order to update AuthContext.
  const handleSubmit = (e) => {
    e.preventDefault()
    if(isNew){
      if(isUniqueUsername(newUser)){
        createUser(newUser)
      } else {
        createNotice(`${newUser?.username} is already taken.`, 'error')
        return
      }
    } else {
      updateUser(newUser)
    }

    if(isLoggedIn){
      if(isYou){
        // If this is the user's own record, send them back home.
        updateCurrentUser(newUser)
        navigate(`/`);
      } else {
        // If not, they must have come from /admin, so return them.
        navigate(`/admin`);
      }
    } else {
      // The user just created a new account, send them to login form.
      navigate(`/login`)
    }
  }

  return !isNew && isCurrentUserLoading ? 
    (<AppLoader />)
    : 
    (
    <>
      {notice && 
        <Notice
        close = {deleteNotice}
        message = {notice?.message}
        type = {notice?.type}
        />
      }
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
                  e => setNewUser({...newUser, name: e.target.value})
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
                  e => setNewUser({...newUser, username: e.target.value})
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
                  e => setNewUser({...newUser, password: e.target.value})
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
    </>
  );
}