import { Tab } from 'semantic-ui-react'

export default function AppTab(props){
    return (
        <Tab {...props} />
    )
}

AppTab.Pane = (props) => (<Tab.Pane {...props} />)