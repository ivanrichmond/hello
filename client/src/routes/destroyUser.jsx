//TODO: Should I consolidate destroyUser into user?
import { redirect } from "react-router-dom";
import { deleteUser } from "../data/users.js";

export async function action({ params, request }) {
    /*
    * HERE'S THE TRICK: In order to reroute /users to / but /admin to /admin,
    * I've followed the advice from React Router documentation on `action`
    * for multiple actions.  In each delete button, I enter name and value.
    * For /users, this is name=from, value=user. 
    * For /admin, this is name=from, value=admin.
    * This way, I can branch on this from formData, and still keep things DRY
    * by having only one route and one action, but two redirects. 
    */
    const formData = await request.formData();
    const from = formData.get("from")
    
    await deleteUser(params.userId);

    if(from === 'user'){
        // User deleted their own account, so reroute to /.
        return redirect("/");
    } else if(from === 'admin'){
        // Admin destroyed this user and may want to wreak more destruction :).
        // Reroute to /admin.
        return redirect("/admin")
    }
}

