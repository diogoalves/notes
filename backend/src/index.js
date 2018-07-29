//TODO move to apollo-server v2
//TODO installs graphql-import
//TODO use local postgress instance
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

const resolvers = {
  Query,
  Mutation,
  AuthPayload
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      // endpoint: 'https://us1.prisma.sh/diogo-alves-b47d59/notes-database/dev',
      endpoint: 'http://localhost:4466',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})

server.start(() => console.log(`Server is running on http://localhost:4000`))