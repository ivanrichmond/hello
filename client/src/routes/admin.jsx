import React, { useContext } from 'react';
import { Form, Navigate, useLoaderData } from 'react-router-dom'
import { Tab, Table } from 'semantic-ui-react'

import AppButton from '../styleLibrary/AppButton'
// import AppTab from '../styleLibrary/AppTab'
import { getUsers } from '../data/users.js'
import { AdminContext } from '../contexts/AdminProvider'

export async function loader() {
    const users = await getUsers();
    return { users };
}

const Admin = () => {
    const { users } = useLoaderData();

    const { isAdmin, validateAdmin } = useContext(AdminContext)
    if(!isAdmin) {
        const isValid = validateAdmin()
        return isValid ? <Navigate to='/admin' /> : <Navigate to='/' />
    }

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

    return (
        <div className="Admin">
            <h1>Hello Configuration</h1>
            <Tab panes={panes} />
        </div>
    )
}

export default Admin;
