const graphql = require('graphql');

const User = require('../models/User');

const {
    GraphQLObjectType,
    GraphQLString,
} = graphql;

module.exports = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        user: {
            type: require('./User'),
            resolve({ userId }, args) {
                return User.findById(userId).then(user => user);
            }
        }
    })
});
