import { route } from 'preact-router';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { saveTokensToStore /*, adminTokensReceived*/ } from './auth.reducer';
import {
	apiCheckToken,
	apiGetNewToken /*, apiGetAllUsers*/
} from '../api/auth.api';

export const loadLocalUserAuth = () => dispatch => {
	let refreshToken = localStorage.getItem('refreshToken');
	if (!refreshToken) return;
	apiGetNewToken(refreshToken)
		.then(rsp => {
			if (rsp.success) {
				return dispatch(saveTokens(rsp.authToken, refreshToken));
			}
			localStorage.removeItem('authToken');
			localStorage.removeItem('refreshToken');
		})
		.catch(err => {
			localStorage.removeItem('authToken');
			localStorage.removeItem('refreshToken');
		});
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
			if (rsp.success) {
				dispatch({ type: 'TOKEN_IS_VALID' });
			}
		})
		.catch(err => {});
};

export const refreshToken = refreshToken => dispatch =>
	apiGetNewToken(refreshToken)
		.then(tokenSuccess => {
			dispatch(saveTokens(tokenSuccess.authToken, refreshToken));
		})
		.catch(err => {
			console.log('err', err);
		});

export const logoutUser = reason => {
	localStorage.removeItem('authToken');
	localStorage.removeItem('refreshToken');
	reason === 'refreshExpired' ? route('/?refreshExpired=true') : route('/');
};

// kept in for reference in the admin/index.js page as this was
// dispatched via Redux
// export const getAllTokens = () => dispatch => {
// 	apiGetAllUsers()
// 		.then(tokens => {
// 			let newFormat = tokens.message.map(token => {
// 				if (token.refreshToken) {
// 					let decoded = jwtDecode(token.refreshToken);
// 					let expiresIn = moment.unix(decoded.exp).fromNow();
//
// 					return {
// 						refreshToken: token.refreshToken,
// 						email: token.email,
// 						expiresIn
// 					};
// 				}
// 			});
// 			dispatch(adminTokensReceived(newFormat));
// 		})
// 		.catch(err => console.log(err));
// };

export const formatAdminTokens = tokens =>
	tokens.map(token => {
		if (token.refreshToken) {
			let decoded = jwtDecode(token.refreshToken);
			let expiresIn = moment.unix(decoded.exp).fromNow();

			return {
				refreshToken: token.refreshToken,
				email: token.email,
				expiresIn
			};
		}
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
