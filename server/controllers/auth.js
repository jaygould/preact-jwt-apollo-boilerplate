const Users = require('../models/Users');
const LoginActivity = require('../models/LoginActivity');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const errors = require('./error');

let createToken = (req, res, next) => {
	req.authToken = jwt.sign(
		_.omit(req.user.toObject(), 'password'),
		config.secret,
		{
			expiresIn: '1m' //lower value for testing
		}
	);
	next();
};
let createRefreshToken = (req, res, next) => {
	//if refresh token doesnt exist already. It won't exist when signing up abviously,
	//but when the user logs in they should have one already in the DB.
	//This just adds one in if they haven't (testing mainly). It doesn't always need
	//to be in the /login endpoint route
	req.refreshToken = jwt.sign({ type: 'refresh' }, config.secret, {
		expiresIn: 60 * 60 // 1 hour
	});
	Users.findOneAndUpdate(
		{ email: req.user.email },
		{ refreshToken: req.refreshToken }
	)
		.then(() => {
			next();
		})
		.catch(err => {
			return errors.errorHandler(res, err);
		});
};
let validateRefreshToken = (req, res, next) => {
	let refreshToken = req.body.refreshToken;

	if (refreshToken != '') {
		jwt.verify(refreshToken, config.secret, err => {
			if (err) {
				return errors.errorHandler(
					res,
					'Refresh token expired - session ended.',
					'refreshExpired'
				);
			}
		});

		Users.findOne({ refreshToken: req.body.refreshToken })
			.then(user => {
				req.user = user;
				next();
			})
			.catch(err => {
				return errors.errorHandler(res, err);
			});
	} else {
		return errors.errorHandler(res, 'There is no refresh token to check.');
	}
};
let logUserActivity = (req, res, next) => {
	LoginActivity.create({ userID: req.user.id, activityType: req.activity })
		.then(next())
		.catch(err => {
			return errors.errorHandler(res, err);
		});
};

module.exports = {
	createToken,
	createRefreshToken,
	validateRefreshToken,
	logUserActivity
};
