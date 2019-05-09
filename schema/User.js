const graphql = require('graphql');

const Post = require('../models/Post');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
} = graphql;

module.exports = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        posts: {
            type: new GraphQLList(require('./Post')),
            resolve({ _id }, args) {
                return Post.find({ userId: _id }).then(posts => posts);
            }
        }
    })
});
