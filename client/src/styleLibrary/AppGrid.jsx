import { Grid } from 'semantic-ui-react'

export default function AppGrid(props){
    return (
        <Grid {...props} />
    )
}

AppGrid.Column = (props) => (<Grid.Column {...props} />)
AppGrid.Row = (props) => (<Grid.Row {...props} />)