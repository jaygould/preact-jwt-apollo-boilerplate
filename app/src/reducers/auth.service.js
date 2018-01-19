import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { saveTokensToStore } from './auth.reducer';
import { apiCheckToken, apiGetNewToken } from '../api/auth.api';

export const saveTokens = (authToken, refreshToken) => dispatch => {
	localStorage.setItem('authToken', authToken);
	localStorage.setItem('refreshToken', refreshToken);
	dispatch(saveTokensToStore({ authToken, refreshToken }));
};

export const checkToken = authToken => dispatch => {
	apiCheckToken(authToken)
		.then(rsp => {
			console.log(rsp); //token is ok and here is result
		})
		.catch(err => {
			console.log('err0', err);
		});
};

export const getNewToken = refreshToken => dispatch =>
	apiGetNewToken(refreshToken)
		.then(tokenSuccess => {
			dispatch(saveTokens(tokenSuccess.authToken, refreshToken));
		})
		.catch(err => {
			console.log('err', err);
		});

export const isTokenExpired = token => {
	let tokenExpiration = jwtDecode(token).exp;
	//if token will expire in the next 30 seconds...
	if (
		tokenExpiration &&
		moment.unix(tokenExpiration) - moment(Date.now()) < 30
	) {
		return true;
	}
};
