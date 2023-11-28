import React from 'react'
import { 
    Form, 
    useLoaderData,
    useNavigate,
} from "react-router-dom";
import { getUser, updateUser } from "../data/users.js";

import AppButton from '../styleLibrary/AppButton'
import AppGrid from '../styleLibrary/AppGrid'

export async function action({ request, params }) {
    let formData = await request.formData();
    return updateUser(params.userId, {
      favorite: formData.get("favorite") === "true",
    });
}

export async function loader({ params }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const user = await getUser(params.userId);
    if (!user) {
        throw new Response("", {
            status: 404,
            statusText: "Sorry!  The user you requested is not found.",
        });
    }
    return { user };
}
  
export default function User() {
    const { user } = useLoaderData();
    const navigate = useNavigate();

    return (
        <AppGrid>
        <AppGrid.Row>
          <AppGrid.Column>
            <label htmlFor={'name'}>Name: </label>
          </AppGrid.Column>
          
          <AppGrid.Column>
            {user.name}
          </AppGrid.Column>
        </AppGrid.Row>
        <AppGrid.Row>
          <AppGrid.Column>
            <label htmlFor={'username'}>Username: </label>
          </AppGrid.Column>
          
          <AppGrid.Column>
            {user.username}
          </AppGrid.Column>
        </AppGrid.Row>

        <AppGrid.Row>
          <AppGrid.Column>
            <Form action="edit">
                <AppButton color="green" type="submit">Edit</AppButton>
            </Form>
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
    );
}
