//@flow
import { ApolloServer } from '@apollo/server'
import 'colors'

import * as config from '../../config.json';
import { resolvers } from './resolvers/index.js'
// $FlowFixMe -- Flow can't find this even after I run flow-typed update.
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema/index.js'

const graphQLPort = config?.graphQLPort || 4000
const apolloServer = new ApolloServer({typeDefs, resolvers})

const startApolloServer = async function(){
    const { url } = await startStandaloneServer(apolloServer, {
        listen: { port: graphQLPort }
    })

    // $FlowFixMe -- Flow can't find this even after I run flow-typed update.
    console.log(`${'Apollo server is listening at:'.green} ${url.blue}`)
    // $FlowFixMe -- Flow can't find this even after I run flow-typed update.
    console.log(`${'Query Apollo Server at:'.magenta} ${'https://studio.apollographql.com/sandbox/explorer'.blue}`)
}
export default startApolloServer
