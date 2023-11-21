import { Form } from 'semantic-ui-react'

const AppForm = (props) => {
    return (
        <Form {...props} />
    )
}

AppForm.Button = (props) => (<Form.Button {...props} />)
AppForm.Checkbox = (props) => (<Form.Checkbox {...props} />)
AppForm.Dropdown = (props) => (<Form.Dropdown {...props} />)
AppForm.Field = (props) => (<Form.Field {...props} />)
AppForm.Group = (props) => (<Form.Group {...props} />)
AppForm.Input = (props) => (<Form.Input {...props} />)
AppForm.Radio = (props) => (<Form.Radio {...props} />)
AppForm.Select = (props) => (<Form.Select {...props} />)
AppForm.TextArea = (props) => (<Form.TextArea {...props} />)


export default AppForm