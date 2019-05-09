const User = require('../models/User');
const Post = require('../models/Post');

const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull
} = graphql;

module.exports = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: require('./User'),
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return User.findById(id).then(user => user);
            }
        },
        users: {
            type: new GraphQLList(require('./User')),
            resolve(parentValue, args) {
                return User.find().then(users => users);
            }
        },
        post: {
            type: require('./Post'),
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return Post.findById(id).then(post => post);
            }
        },
        posts: {
            type: new GraphQLList(require('./Post')),
            resolve(parentValue, args) {
                return Post.find().then(posts => posts);
            }
        }
    })
});
