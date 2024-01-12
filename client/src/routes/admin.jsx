import React, { useContext } from 'react';
import { Form, Navigate } from 'react-router-dom'

import { AdminContext } from '../contexts/AdminProvider'
import AppButton from '../styleLibrary/AppButton'
import AppLoader from '../styleLibrary/AppLoader';
import AppTab from '../styleLibrary/AppTab'
import AppTable from '../styleLibrary/AppTable'
import { 
    useDeleteUserMutation,
    useGetUsersQuery,
} from '../features/api/apiSlice';
import { useNotice } from '../contexts/NoticeProvider'

const Admin = () => {
    const { createNotice } = useNotice()
    const { 
        data: users, 
        isLoading,
        isError,
        error 
    } = useGetUsersQuery()

    if(isError){
        createNotice(error, 'error')
    }

    const { deleteUser } = useDeleteUserMutation()

    const { isAdmin, validateAdmin } = useContext(AdminContext)
    if(!isAdmin) {
        const isValid = validateAdmin()
        return isValid ? <Navigate to='/admin' /> : <Navigate to='/' />
    }

    const userList = isLoading ? 
        <AppLoader />
        :
        users.map((user,index) => {
            return(
                <AppTable.Row key={index}> 
                    <AppTable.Cell>{user.name || "<no name given>"}</AppTable.Cell>
                    <AppTable.Cell>{user.username || "<username left blank>"}</AppTable.Cell>
                    <AppTable.Cell>

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
                                deleteUser(user.id)
                            }
                        }} >
                            <AppButton
                            icon="trash"
                            type="button"
                            name="from"
                            value="admin" />
                        </Form>

                    </AppTable.Cell>
                </AppTable.Row>
            )
        })

    const userTable = (
        <AppTable size='small' striped compact celled selectable>
            <AppTable.Header>
                <AppTable.Row>
                    <AppTable.HeaderCell>Name</AppTable.HeaderCell><AppTable.HeaderCell>username</AppTable.HeaderCell><AppTable.HeaderCell>Action</AppTable.HeaderCell>
                </AppTable.Row>
            </AppTable.Header>
            <AppTable.Body>
                {userList}
            </AppTable.Body>
        </AppTable>
    )

    const panes = [
        { 
            menuItem: 'Manage Users', render: () => (
                <AppTab.Pane>
                    <h2>Users</h2>
                    {userTable}
                </AppTab.Pane>
            )
        },
        { 
            menuItem: 'General Configuration', render: () => (
                <AppTab.Pane>TODO: This will hold general app config.</AppTab.Pane> 
            ) 
        },
    ]

    return (
        <div className="Admin">
            <h1>Hello Configuration</h1>
            <AppTab panes={panes} />
        </div>
    )
}

export default Admin;
