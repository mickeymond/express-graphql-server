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
            type: UserType,
            resolve({ userId }, args) {
                return User.findById(userId).then(user => user);
            }
        }
    })
});

const UserType = require('./User');
