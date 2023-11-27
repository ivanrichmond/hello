import { Table } from 'semantic-ui-react'

export default function AppTable(props){
    return (
        <Table {...props} />
    )
}

AppTable.Body = (props) => (<Table.Body {...props} />)
AppTable.Cell = (props) => (<Table.Cell {...props} />)
AppTable.Footer = (props) => (<Table.Footer {...props} />)
AppTable.Header = (props) => (<Table.Header {...props} />)
AppTable.HeaderCell = (props) => (<Table.HeaderCell {...props} />)
AppTable.Row = (props) => (<Table.Row {...props} />)