const graphql = require('graphql');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
    query: require('./RootQuery'),
    mutation: require('../mutations')
});
