import { Dimmer, Loader } from 'semantic-ui-react'

export default function AppLoader(props){
    return (
        <Dimmer>
            <Loader {...props} />
        </Dimmer>
    )
}