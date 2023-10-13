import { 
    Form, 
    useLoaderData,
    redirect,
    useNavigate,
} from "react-router-dom";

import AppForm from '../styleLibrary/AppForm'
import { updateUser } from "../data/users.js";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateUser(params.userId, updates);
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
      <p>
        <label forHmtl={'name'}>Name</label>
        <Form.Input
          placeholder="Name"
          aria-label="Name"
          type="text"
          name="name"
          id="name"
          defaultValue={user.name}
        />
      </p>
      <p>
        <label forHmtl={'username'}>Username</label>
        <Form.Input
          placeholder="Username"
          aria-label="Username"
          type="text"
          name="username"
          id="username"
          defaultValue={user.username}
        />
      </p>
      <p>
        <label forHmtl={'password'}>Password</label>
        <Form.Input
          placeholder="Password"
          aria-label="Password"
          type="password"
          name="password"
          id="password"
          defaultValue={user.password}
        /> 
      </p>
      <p>
        <Form.Button type="submit">Save</Form.Button>
        <Form.Button 
        type="Form.Button"
        onClick={() => {
            navigate(-1)
        }}>Cancel</Form.Button>
      </p>
    </Form>
  );
}