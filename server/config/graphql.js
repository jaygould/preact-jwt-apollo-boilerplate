const { graphqlExpress } = require('apollo-server-express');
const { graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const schema = require('../models/gqlSchema');

const connect = app => {
	app.use(
		'/graphql',
		bodyParser.json(),
		graphqlExpress({ schema }),
		(req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header(
				'Access-Control-Allow-Headers',
				'Content-Type, Authorization, Content-Length, X-Requested-With'
			);
			if (req.method === 'OPTIONS') {
				res.sendStatus(200);
			} else {
				next();
			}
		}
	);
	app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
};

module.exports = {
	connect
};
