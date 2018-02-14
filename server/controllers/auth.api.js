const express = require('express');
const router = express.Router();
const Users = require('../models/mongo/Users');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const config = require('../config/auth.js');
const errors = require('./error');

router.post('/signup', (req, res) => {
	auth
		.registerUser(
			req.body.first,
			req.body.last,
			req.body.email,
			req.body.password
		)
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
		.then(() => {
			res.send({
				success: true
			});
		})
		.catch(err => {
			res.send(errors.errorHandler(err));
		});
});

router.post('/login', (req, res) => {
	auth
		.loginUser(req.body.email, req.body.password)
		.then(user => {
			let authToken = auth.createToken(user);
			let refreshToken = auth.createRefreshToken(user);
			let userActivityLog = auth.logUserActivity(user, 'login');
			return Promise.all([
				authToken,
				refreshToken,
				userActivityLog
			]).then(tokens => {
				return {
					authToken: tokens[0],
					refreshToken: tokens[1]
				};
			});
		})
		.then(success => {
			res.send({
				success: true,
				authToken: success.authToken,
				refreshToken: success.refreshToken
			});
		})
		.catch(err => {
			res.send(errors.errorHandler(err));
		});
});

router.post('/refreshToken', (req, res) => {
	auth
		.validateRefreshToken(req.body.refreshToken)
		.then(tokenResponse => {
			return auth.createToken(tokenResponse);
		})
		.then(authToken => {
			res.status(200).send({
				success: true,
				authToken: authToken
			});
		})
		.catch(err => {
			if (err.code) {
				res.status(403).send(errors.errorHandler(err.message, err.code));
			} else {
				res.send(errors.errorHandler(err.message));
			}
		});
});

router.use((req, res, next) => {
	var token = req.headers['authorization'];
	token = token.replace('Bearer ', '');
	jwt.verify(token, config.secret, err => {
		if (err) {
			res
				.status(403)
				.send(
					errors.errorHandler('Your access token is invalid.', 'invalidToken')
				);
		} else {
			next();
		}
	});
});

router.post('/checkToken', (req, res) => {
	res.status(201).send({
		success: true,
		message: 'Token is still valid.'
	});
});

router.post('/getAllUsers', (req, res) => {
	Users.find()
		.then(users => {
			res.status(201).send({
				success: true,
				message: users
			});
		})
		.catch(err => {
			return errors.errorHandler(res, err);
		});
});

module.exports = router;
