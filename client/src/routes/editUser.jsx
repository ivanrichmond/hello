import { 
    Form, 
    useLoaderData,
    redirect,
    useNavigate,
} from "react-router-dom";

// import AppForm from '../styleLibrary/AppForm'
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
  console.debug(user)
  if(!user) userNotFoundError();
  const navigate = useNavigate();

  return (
    <Form method="post" id="user-form">
      <p>
        <label htmlFor={'name'}>Name</label>
        <input
          placeholder="Name"
          aria-label="Name"
          type="text"
          name="name"
          id="name"
          defaultValue={user.name}
        />
      </p>
      <p>
        <label htmlFor={'username'}>Username</label>
        <input
          placeholder="Username"
          aria-label="Username"
          type="text"
          name="username"
          id="username"
          defaultValue={user.username}
        />
      </p>
      <p>
        <label htmlFor={'password'}>Password</label>
        <input
          placeholder="Password"
          aria-label="Password"
          type="password"
          name="password"
          id="password"
          defaultValue={user.password}
        /> 
      </p>
      <p>
        <button type="submit">Save</button>
        <button 
        type="button"
        onClick={() => {
            navigate(-1)
        }}>Cancel</button>
      </p>
    </Form>
  );
}