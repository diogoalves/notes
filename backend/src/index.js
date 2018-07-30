const { ApolloServer, gql } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

const resolvers = {
  Query,
  Mutation,
  AuthPayload
}

const server = new ApolloServer({
  typeDefs: importSchema('src/schema.graphql'),
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

// server.start(() => console.log(`Server is running on http://localhost:4000`))

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});