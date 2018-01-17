const { graphqlExpress } = require('apollo-server-express');
const { graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const schema = require('../models/gqlSchema');

const connect = app => {
	app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
	app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
};

module.exports = {
	connect
};
