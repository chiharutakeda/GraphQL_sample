const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql')
const app = express()

const schema = new GraphQLSchema ({
    query: new GraphQLObjectType({
        //nameにスペース使えない
        name: 'HelloWorld',
        fields:() =>({
            message: {
                type: GraphQLString,
                resolve:() => 'Hellow World'
            }
        })
    })
})

app.use('/graphql',expressGraphQL({
    schema:schema,
    graphiql:true
}))
app.listen(5000.,()=> console.log('Server Runningj'))