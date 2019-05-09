const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const PORT = process.env.PORT || 3000;

const app = express();

require('./config/database');

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.get('/', (req, res, next) => {
    res.json({
        status: "Your GraphQL Server is up and running",
        message: "Navigate to /graphql to access your GraphiQL UI"
    });
});

app.listen(PORT, () => {
    console.log('Server running on PORT ' + PORT);
});
