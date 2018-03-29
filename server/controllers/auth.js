const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/auth.js');
const Users = require('../connectors/Users');
const LoginActivity = require('../connectors/LoginActivity');

let registerUser = (first, last, email, password) => {
	if (!first || !last || !email || !password) {
		throw 'You must send all details.';
	}
	return Users.find({ email: email })
		.then(user => {
			if (user.length > 0) {
				throw 'A user with that username already exists.';
			}
			let passwordHash = bcrypt.hashSync(password.trim(), 12);
			let newUser = { first, last, email };
			newUser.password = passwordHash;
			return Users.create(newUser);
		})
		.catch(err => {
			throw err;
		});
};

let loginUser = (email, password) => {
	if (!email || !password) {
		throw 'You must send the username and the password.';
	}
	return Users.findOne({ email: email })
		.then(user => {
			if (!user) throw 'No matching user.';
			return new Promise((res, rej) => {
				bcrypt.compare(password, user.password, (err, success) => {
					if (err) {
						rej('The has been an unexpected error, please try again later');
					}
					if (!success) {
						rej('Your password is incorrect.');
					} else {
						res(user);
					}
				});
			});
		})
		.catch(err => {
			throw err;
		});
};

let createToken = user => {
	return jwt.sign(_.omit(user.toObject(), 'password'), config.secret, {
		expiresIn: '5s' //lower value for testing
	});
};

let createRefreshToken = user => {
	//It doesn't always need to be in the /login endpoint route
	let refreshToken = jwt.sign({ type: 'refresh' }, config.secret, {
		expiresIn: '10s' // 1 hour
	});
	return Users.findOneAndUpdate(
		{ email: user.email },
		{ refreshToken: refreshToken }
	)
		.then(() => {
			return refreshToken;
		})
		.catch(err => {
			throw err;
		});
};

let validateRefreshToken = refreshToken => {
	if (refreshToken != '') {
		return new Promise((res, rej) => {
			jwt.verify(refreshToken, config.secret, err => {
				if (err) {
					rej({
						code: 'refreshExpired',
						message: 'Refresh token expired - session ended.'
					});
				} else {
					Users.findOne({ refreshToken: refreshToken })
						.then(user => {
							res(user);
						})
						.catch(err => {
							rej(err);
						});
				}
			});
		});
	} else {
		throw 'There is no refresh token to check.';
	}
};

let logUserActivity = (user, activity) => {
	return LoginActivity.create({ userID: user.id, activityType: activity });
};

module.exports = {
	registerUser,
	loginUser,
	createToken,
	createRefreshToken,
	validateRefreshToken,
	logUserActivity
};
