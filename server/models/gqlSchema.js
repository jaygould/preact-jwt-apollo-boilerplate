const {
	makeExecutableSchema
	//addMockFunctionsToSchema
} = require('graphql-tools');
const resolvers = require('./gql/resolvers');
//const mocks = require('./gql/mocks');

const typeDefs = `
# Entry points
type Query {
  user(email: String): User
  allUsers: [User]
	allLoginActivity: [LoginActivity]
}

# Custom types
type User {
  id: String
  first: String
  last: String
  email: String
	password: String
	refreshToken: String
	thisLoginActivity: [LoginActivity]
}

type LoginActivity {
  thisUser: User
	activityType: String
  time: String
}

### Get currently active refresh tokens - perhaps do this without Apollo beforehand?
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

//addMockFunctionsToSchema({ schema, mocks });

module.exports = schema;
