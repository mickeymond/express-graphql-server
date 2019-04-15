const express = require('express');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true })
.then(() => console.log('mongodb connected'))
.catch(err => console.log(err));

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
