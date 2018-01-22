import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { saveTokensToStore } from './auth.reducer';
import { apiCheckToken, apiGetNewToken } from '../api/auth.api';

export const loadLocalUserAuth = () => dispatch => {
	let authToken = localStorage.getItem('authToken');
	let refreshToken = localStorage.getItem('refreshToken');
	if (authToken && refreshToken) {
		dispatch(saveTokens(authToken, refreshToken));
	}
};

export const saveTokens = (authToken, refreshToken) => dispatch => {
	localStorage.setItem('authToken', authToken);
	localStorage.setItem('refreshToken', refreshToken);
	dispatch(
		saveTokensToStore({ authToken, refreshToken }, jwtDecode(authToken))
	);
};

export const checkToken = () => dispatch => {
	apiCheckToken()
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

//this function is used to check if the token is about to expire in the next 30 seconds.
//this was used to refrsh token while it's still valid but just before it expires, but this
//is now olsolete as the actions are buffered and released when the token has expired
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
