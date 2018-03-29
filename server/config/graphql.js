const { graphqlExpress } = require('apollo-server-express');
const { graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const ejwt = require('express-jwt');
const config = require('../config/auth.js');
const schema = require('../schema/gqlSchema');

const connect = app => {
	app.use(
		'/graphql',
		bodyParser.json(),
		ejwt({
			secret: config.secret,
			credentialsRequired: false
		}),
		graphqlExpress(req => ({
			schema,
			context: {
				user: req.user
			}
		})),
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
