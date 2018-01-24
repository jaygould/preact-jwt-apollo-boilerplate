const Users = require('../Users');
const LoginActivity = require('../LoginActivity');

const resolvers = {
	Query: {
		user(root, args) {
			return Users.findOne({ email: args.email });
		},
		allUsers() {
			return Users.find();
		},
		allLoginActivity() {
			return LoginActivity.find();
		}
	},
	User: {
		thisLoginActivity(user) {
			return LoginActivity.find({ userID: user._id });
		}
	},
	LoginActivity: {
		user(activity) {
			return Users.findOne({ _id: activity.userID });
		}
	}
};

module.exports = resolvers;
