import React from 'react'
import { 
    Form, 
    useLoaderData,
} from "react-router-dom";
import { getUser, updateUser } from "../data/users.js";

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

    return (
        <div id="User">
            <h1>
                {user.name ? (
                <>
                    {user.name}
                </>
                ) : (
                <i>Cyclops Slayer, AKA Noname.  (HINT: Add your name!)</i>
                )}{" "}
            </h1>

            <div>
                <Form action="edit">
                    <button type="submit">Edit</button>
                </Form>
                <Form
                method="post"
                action="destroy"
                onSubmit={(event) => {
                    if ( !window.confirm( "Please confirm you want to delete this record." ) ) {
                    // if ( false ) {
                        event.preventDefault();
                    }
                }}
                >
                    <button type="submit">Delete</button>
                </Form>
            </div>
        </div>
    );
}
