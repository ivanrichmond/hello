// This is an actual dismissable banner that shows a notice.
import React from 'react'

import AppMessage from '../styleLibrary/AppMessage'

const Notice = ({message, type, close = () => {} }) => {
    // NOTE: by convention type correponds to 
    // props of SUI's <Message>: info, warning, error
    console.debug('message', message)
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