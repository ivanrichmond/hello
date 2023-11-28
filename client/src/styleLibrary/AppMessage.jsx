import { Message } from 'semantic-ui-react'

const AppMessage = (props) => {
    return (
        <Message 
        {...props}
        />
    )
}

AppMessage.Content = (props) => (<Message.Content {...props} />)
AppMessage.Header = (props) => (<Message.Header {...props} />)
AppMessage.Item = (props) => (<Message.Item {...props} />)
AppMessage.List = (props) => (<Message.List {...props} />)

export default AppMessage