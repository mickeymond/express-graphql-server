const graphql = require('graphql');

const User = require('../models/User');
const Post = require('../models/Post');

const UserType = require('../schema/User');
const PostType = require('../schema/Post');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = graphql;

module.exports = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addUser: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { name, username, email }) {
                return User.create({ name, username, email }).then(user => user);
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return User.findByIdAndDelete(id).then(user => user);
            }
        },
        addPost: {
            type: PostType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { title, content, userId }) {
                return Post.create({ title, content, userId }).then(post => post);
            }
        }
    })
});
