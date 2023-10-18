import React from 'react';
import { 
    Form,
    Outlet,
    redirect,
} from "react-router-dom";

import '../css/Root.css';
import { createUser } from '../data/users.js'
import AppButton from '../styleLibrary/AppButton'

export async function action() {
    const user = await createUser();
    return redirect(`/users/${user.id}/edit`);
}

function Root() {
  // eslint-disable-next-line
  const [data, setData] = React.useState(null);

  // TODO: Get data from /api / delete eslint-disable, above.

  return (
    <div className="Root">
      <header className="Root-header">
        <h1>Welcome to the Hello suite.</h1>
        <div className='Outlet'>
          <p>Here's the Outlet:</p>
          <Outlet />
          <p>Here endith the Outlet.</p>
        </div>
        <Form method="post">
            <AppButton primary type="submit">New</AppButton >
        </Form>
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default Root;
