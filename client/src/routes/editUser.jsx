import { 
    Form, 
    useLoaderData,
    redirect,
    useNavigate,
} from "react-router-dom";
// TODO: AppGrid fix wrapper under styleLibrary.  
// Grid is multi-component, so will need more
// handling than just a straight wrapper.
import { Grid as AppGrid } from 'semantic-ui-react'

import AppButton from '../styleLibrary/AppButton'
// import AppGrid from '../styleLibrary/AppGrid'
import AppInput from '../styleLibrary/AppInput'

import { updateUser } from "../data/users.js";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateUser(params.userId, updates);
    //TODO: If it's a new user, from Create Account, reroute to /.
    return redirect(`/users/${params.userId}`);
}

function userNotFoundError(){
      const errorMessage = "User not found."
      console.error(errorMessage)
      throw new Error(errorMessage)
}

export default function EditUser() {
  const { user } = useLoaderData();
  if(!user) userNotFoundError();
  const navigate = useNavigate();

  return (
    <Form method="post" id="user-form">
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