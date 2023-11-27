import { useContext } from 'react'
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
  const { isLoggedIn } = useContext(AuthContext)
  const { user } = useLoaderData();
  if(!user && !isLoggedIn) userNotFoundError();
  const navigate = useNavigate();
  const loggedIn = isLoggedIn()
  const heading = loggedIn ? 'Edit User' : 'Create Account'

  return (
    <Form method="post" id="user-form">
      <h1>{heading}</h1>
      <input type="hidden" name="loggedIn" value={loggedIn} />
      <AppGrid>
        <AppGrid.Row>
          <AppGrid.Column>
            <label htmlFor={'name'}>Name: </label>
          </AppGrid.Column>
          
          <AppGrid.Column>
            <AppInput
              placeholder="Name"
              aria-label="Name"
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
            />
          </AppGrid.Column>
        </AppGrid.Row>
        <AppGrid.Row>
          <AppGrid.Column>
            <label htmlFor={'username'}>Username: </label>
          </AppGrid.Column>
          
          <AppGrid.Column>
            <AppInput
              placeholder="username"
              aria-label="username"
              type="text"
              name="username"
              id="username"
              defaultValue={user.username}
            />
          </AppGrid.Column>
        </AppGrid.Row>
        <AppGrid.Row>
          <AppGrid.Column>
            <label htmlFor={'password'}>Password: </label>
          </AppGrid.Column>
          
          <AppGrid.Column>
            <AppInput
              placeholder="password"
              aria-label="password"
              type="password"
              name="password"
              id="password"
              defaultValue={user.password}
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