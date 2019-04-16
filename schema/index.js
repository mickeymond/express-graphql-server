const graphql = require('graphql');
const mutation = require('../mutations');
const RootQuery = require('./RootQuery');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
