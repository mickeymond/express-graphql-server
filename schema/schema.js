const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = graphql;

const User = require('../models/User');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parentValue, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/users/${parentValue.userId}/posts`).then(res => {
                    return res.data;
                });
            }
        }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parentValue, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/users/${parentValue.userId}`).then(res => {
                    return res.data;
                });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            args: { id: { type: GraphQLInt } },
            resolve(parentValue, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/users/${args.id}`).then(res => {
                    return res.data;
                });
            }
        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLInt } },
            resolve(parentValue, args) {
                return axios.get(`https://jsonplaceholder.typicode.com/posts/${args.id}`).then(res => {
                    return res.data;
                });
            }
        }
    })
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { name, username, email }) {
                return User.create({ name, username, email }).then(user => user);
            }
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
            resolve(parentValue, { id }) {
                return axios.delete(`https://jsonplaceholder.typicode.com/users}`, {
                    id
                }).then(res => {
                    return res.data;
                })
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
