// This is an actual dismissable banner that shows a notice.
import React from 'react'
//TODO: Replace with AppMessage, when finished.
import { Message as AppMessage } from 'semantic-ui-react'

//TODO: This needs to be more robust to work.
// import AppMessage from '../styleLibrary/AppMessage'

const Notice = ({message, type, close = () => {} }) => {
    // NOTE: by convention type correponds to 
    // props of SUI's <Message>: info, warning, error
    return (
        <AppMessage 
        error = {type === 'error'} 
        info = {type === 'info'} 
        onDismiss = {() => close()}
        success = {type === 'success'} 
        warning = {type === 'warning'} 
        >
            <AppMessage.Header>{type.toUpperCase()}</AppMessage.Header>
            <p>{message}</p>
        </AppMessage>
    )
}

export default Notice