const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')
const app = express()

//とりあえずデータベースなしで
const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]


const BookType = new GraphQLObjectType({
    //graphqlの名前
    name:  'Book',
    //graphqlの説明
    description: 'This represents a book written by an author',
    fields:()=>({
        //graphqlの構造を設定
        id:{ type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString)},
        authorId: { type: GraphQLNonNull(GraphQLInt)}
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields:() => ({
        books:{
            //どんなgraphqlタイプなのか決める
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve:() => books
        }
    })
})

const schema =new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql',expressGraphQL({
    schema:schema,
    graphiql:true
}))
app.listen(5000.,()=> console.log('Server Runningj'))