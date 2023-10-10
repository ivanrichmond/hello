//TODO: Should I consolidate destroyUser into user?
import { redirect } from "react-router-dom";
import { deleteUser } from "../data/users.js";

export async function action({ params }) {
    await deleteUser(params.userId);
    return redirect("/");
}
