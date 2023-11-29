import { useContext, useState } from 'react'
import { 
    Form, 
    useLoaderData,
    redirect,
    useNavigate,
} from "react-router-dom";

import AppButton from '../styleLibrary/AppButton'
import AppGrid from '../styleLibrary/AppGrid'
import AppInput from '../styleLibrary/AppInput'
import { AuthContext } from '../contexts/AuthProvider'

import { updateUser } from "../data/users.js";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateUser(params.userId, updates);
    const loggedIn = formData.get("loggedIn") === 'true'
    if(loggedIn){
      return redirect(`/users/${params.userId}`);
    } else {
      // The user just created a new account, send them to login form.
      return redirect(`/login`)
    }
}

function userNotFoundError(){
    const errorMessage = "User not found."
    //TODO: Use NoticeProvider.
    console.error(errorMessage)
    throw new Error(errorMessage)
}

export default function EditUser() {
  const { currentUser, isLoggedIn, setCurrentUser } = useContext(AuthContext)
  const { user } = useLoaderData();
  const [newUser, setNewUser] = useState(user)
  if(!user) userNotFoundError();
  const navigate = useNavigate();
  const loggedIn = isLoggedIn()
  const isYou = currentUser.id === user.id; // Whether you're editing yourself.
  const heading = loggedIn ? 'Edit User' : 'Create Account'

  // This is only used as an adjunct to action, in order to update AuthContext.
  const handleSubmit = (e) => {
    if(isYou) setCurrentUser(newUser)
  }

  return (
    <Form method="post" id="user-form" onSubmit={e => handleSubmit(e)}>
      <h1>{heading}</h1>
      <input type="hidden" name="loggedIn" value={loggedIn} />
      <AppGrid>
        <AppGrid.Row>
          <AppGrid.Column>
            <label htmlFor={'name'}>Name: </label>
          </AppGrid.Column>
          
          <AppGrid.Column>
            <AppInput
              aria-label="Name"
              defaultValue={user.name}
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
              defaultValue={user.username}
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
              defaultValue={user.password}
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
    </Form>
  );
}