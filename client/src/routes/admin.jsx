import React from 'react';
import { Tab } from 'semantic-ui-react'

function Admin() {
    const panes = [
        { 
            menuItem: 'Config', render: () => <Tab.Pane>TODO: This will hold non-user configuration for the app.</Tab.Pane> 
        },
        { 
            menuItem: 'Manage Users', render: () => <Tab.Pane>TODO: This will hold user management.</Tab.Pane> 
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
