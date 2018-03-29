const auth = require('./auth');

let checkUser = context => {
	if (!context.user) {
		return Promise.reject('Unauthorized');
	}
	return Promise.resolve(context.user);
};

let registerUser = (first, last, email, password) => {
	return auth
		.registerUser(first, last, email, password)
		.then(user => {
			let authToken = auth.createToken(user);
			let refreshToken = auth.createRefreshToken(user);
			let userActivityLog = auth.logUserActivity(user, 'signup');
			return Promise.all([
				authToken,
				refreshToken,
				userActivityLog
			]).then(tokens => {
				return {
					user,
					authToken: tokens[0],
					refreshToken: tokens[1]
				};
			});
		})
		.then(success => {
			console.log('success', success);
			return success;
		})
		.catch(err => {
			throw err;
		});
};

module.exports = {
	registerUser,
	checkUser
};
