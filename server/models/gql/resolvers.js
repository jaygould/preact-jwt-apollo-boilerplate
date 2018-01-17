const Users = require('../Users');
const LoginActivity = require('../LoginActivity');

const resolvers = {
	Query: {
		user(root, args) {
			return Users.findOne({ email: args.email });
		},
		allUsers() {
			return Users.find();
		}
	},
	User: {
		thisLoginActivity(user) {
			return LoginActivity.find({ userID: user._id });
		}
	}
};

module.exports = resolvers;
