const Users = require('../connectors/Users');
const LoginActivity = require('../connectors/LoginActivity');
const { checkUser, registerUser } = require('../controllers/modelAuth');

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
			return registerUser(first, last, email, password).then(res => {
				let { first, last, email } = res.user;
				return {
					first,
					last,
					email
				};
			});
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
