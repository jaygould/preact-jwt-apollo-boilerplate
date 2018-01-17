const {
	makeExecutableSchema
	//addMockFunctionsToSchema
} = require('graphql-tools');
const resolvers = require('./gql/resolvers');
//const mocks = require('./gql/mocks');

const typeDefs = `
type Query {
  user(email: String): User
  allUsers: [User]
}

type User {
  id: Int
  first: String
  last: String
  email: String
	password: String
	refreshToken: String
	thisLoginActivity: [LoginActivity]
}

type LoginActivity {
  userID: User
  time: String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

//addMockFunctionsToSchema({ schema, mocks });

module.exports = schema;
