const Users = require('../mongo/Users');
const LoginActivity = require('../mongo/LoginActivity');
const { checkUser, registerUser } = require('./modelAuth');

const resolvers = {
	Query: {
		user(root, args) {
			return Users.findOne({ email: args.email });
		},
		allUsers(_, {}, context) {
			return checkUser(context).then(authedUser => {
				return Users.find();
			});
		},
		allLoginActivity() {
			return LoginActivity.find();
		}
	},
	Mutation: {
		registerUser(root, { first, last, email, password }) {
			return registerUser(first, last, email, password);
		}
	},
	User: {
		thisLoginActivity(user) {
			return LoginActivity.find({ userID: user._id });
		}
	},
	LoginActivity: {
		thisUser(activity) {
			return Users.findOne({ _id: activity.userID });
		}
	}
};

module.exports = resolvers;
