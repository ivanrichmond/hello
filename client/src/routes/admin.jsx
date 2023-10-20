import React from 'react';
import { useLoaderData } from 'react-router-dom'
import { Tab, Table } from 'semantic-ui-react'

import AppButton from '../styleLibrary/AppButton'
// import AppTab from '../styleLibrary/AppTab'
import { getUsers } from '../data/users.js'

export async function loader() {
    const users = await getUsers();
    return { users };
}

function Admin() {
    const { users } = useLoaderData();

    const userList = users.map((user,index) => {
        return(
            <Table.Row key={index}> 
                <Table.Cell>{user.name || "<no name given>"}</Table.Cell>
                <Table.Cell>{user.username || "<username left blank>"}</Table.Cell>
                <Table.Cell>
                    <AppButton icon = 'pencil' color = 'blue' />
                    <AppButton icon = 'trash' color = 'red' />
                </Table.Cell>
            </Table.Row>
        )
    })

    const userTable = (
        <Table size='small' striped compact celled selectable>
            <Table.Header> <th>Name</th> <th>username</th> <th>Action</th> </Table.Header>
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
    );
}

export default Admin;
