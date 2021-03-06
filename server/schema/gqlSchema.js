const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../resolvers');

const typeDefs = `
# Entry points
type Query {
  user(email: String): User
  allUsers: [User]
	allLoginActivity: [LoginActivity]
}

type Mutation {
	registerUser(first: String, last: String, email: String, password: String): User
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

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
