import React, {useState} from 'react';
import { Form, Navigate, useLoaderData } from 'react-router-dom'
import { Tab, Table } from 'semantic-ui-react'
import packageJSON from '../../package.json'

import AppButton from '../styleLibrary/AppButton'
// import AppTab from '../styleLibrary/AppTab'
import { getUsers } from '../data/users.js'

export async function loader() {
    const users = await getUsers();
    return { users };
}

const Admin = () => {
    // Only allow entry to /admin if the admin password is provided.
    //TODO: This is insecure!  Make this come from server.
    // For right now, I'm only working on the UI, so this a placeholder for
    // the real solution, which will be taht this will be in package.json
    // on the server-side Node app (:5000) and we'll have to do a fetch
    // to get this info.
    const [isAdmin, setIsAdmin] = useState(false)
    if(!isAdmin){
        const adminPassword = prompt(packageJSON.adminPrompt)
        let isPasswordCorrect = adminPassword === packageJSON.adminPassword
        console.debug(isPasswordCorrect)
        setIsAdmin(isPasswordCorrect)
    }
    const { users } = useLoaderData();

    const userList = users.map((user,index) => {
        return(
            <Table.Row key={index}> 
                <Table.Cell>{user.name || "<no name given>"}</Table.Cell>
                <Table.Cell>{user.username || "<username left blank>"}</Table.Cell>
                <Table.Cell>

                    <Form 
                    style = {{display: 'inline'}}
                    action={`/users/${user.id}/edit`}
                    >
                        <AppButton icon='pencil' type="submit" />
                    </Form>

                    <Form
                    style = {{display: 'inline'}}
                    method="delete"
                    action={`/users/${user.id}/destroy`}
                    onSubmit={(event) => {
                        //TODO: Not DRY with user.jsx.
                        if ( !window.confirm( "Please confirm you want to delete this record." ) ) {
                            event.preventDefault();
                        }
                    }} >
                        <AppButton
                        icon='trash'
                        type="submit"
                        name="from"
                        value="admin" />
                    </Form>

                </Table.Cell>
            </Table.Row>
        )
    })

    const userTable = (
        <Table size='small' striped compact celled selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell><Table.HeaderCell>username</Table.HeaderCell><Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {userList}
            </Table.Body>
        </Table>
    )

    const panes = [
        { 
            menuItem: 'Manage Users', render: () => (
                <Tab.Pane>
                    <h2>Users</h2>
                    {userTable}
                </Tab.Pane>
            )
        },
        { 
            menuItem: 'General Configuration', render: () => (
                <Tab.Pane>TODO: This will hold general app config.</Tab.Pane> 
            ) 
        },
    ]

<<<<<<< HEAD
    return isPasswordCorrect ? (
=======
    return isAdmin ? (
>>>>>>> router
        <div className="Admin">
            <h1>Hello Configuration</h1>
            <Tab panes={panes} />
        </div>
    ) : ( <Navigate to='/' />)
}

export default Admin;
