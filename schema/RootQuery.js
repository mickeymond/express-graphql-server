const User = require('../models/User');
const Post = require('../models/Post');

const UserType = require('./User');
const PostType = require('./Post');

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
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return User.findById(id).then(user => user);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return User.find().then(users => users);
            }
        },
        post: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return Post.findById(id).then(post => post);
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parentValue, args) {
                return Post.find().then(posts => posts);
            }
        }
    })
});
