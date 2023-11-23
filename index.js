const { ApolloServer } = require("apollo-server");// Import the ApolloServer class from the apollo-server package
const { importSchema } = require("graphql-import"); // Import the importSchema function from the graphql-import package
const EtherDataSource = require("./datasource/ethDatasource");  //

// Import the schema
const typeDefs = importSchema("./schema.graphql");

// Load environment variables from .env file
require("dotenv").config();

// Resolvers that delegate to EtherDataSource methods 
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({// Create the ApolloServer instance
 typeDefs,
 resolvers,
 dataSources: () => ({
   ethDataSource: new EtherDataSource(),  // Create the EtherDataSource instance
 }), 
});

// Set timeout to 0 (no timeout)
server.timeout = 0;

// Start the server
server.listen("9000").then(({ url }) => {// Start the server
 console.log(`🚀 Server ready at ${url}`); 
});
