const { ApolloServer } = require("apollo-server");

// all types, queries, etc. is defined as a typeDef
// all functions that resolve those data, such as making calls to APIs, databases, etc are resolvers
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`YOUR API IS RUNNING AT: ${url}`);
});
