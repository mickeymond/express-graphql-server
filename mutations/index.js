const graphql = require('graphql');

const User = require('../models/User');
const Post = require('../models/Post');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = graphql;

module.exports = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addUser: {
            type: require('../schema/User'),
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { name, username, email }) {
                return User.create({ name, username, email }).then(user => user);
            }
        },
        editUser: {
            type: require('../schema/User'),
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve(parentValue, { id, username, email }) {
                return User.findByIdAndUpdate(id, { username, email }).then(user => user);
            }
        },
        deleteUser: {
            type: require('../schema/User'),
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return User.findByIdAndDelete(id).then(user => user);
            }
        },
        addPost: {
            type: require('../schema/Post'),
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { title, content, userId }) {
                return Post.create({ title, content, userId }).then(post => post);
            }
        },
        editPost: {
            type: require('../schema/Post'),
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: GraphQLString },
                content: { type: GraphQLString },
                userId: { type: GraphQLString }
            },
            resolve(parentValue, { id, title, content, userId }) {
                return Post.findByIdAndUpdate(id, { title, content, userId }).then(post => post);
            }
        },
        deletePost: {
            type: require('../schema/Post'),
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return Post.findByIdAndDelete(id).then(post => post);
            }
        }
    })
});
