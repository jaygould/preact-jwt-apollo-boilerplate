import { getNewToken } from './auth.api';
import { route } from 'preact-router';

export const handleErrors = response => {
	if (response.status === 403) {
		//initiate refresh of token
		let refreshToken = localStorage.getItem('refreshToken');
		getNewToken(refreshToken)
			.then(tokenSuccess => {
				//need to use redux or something... or there eill be repeated code
				localStorage.setItem('authToken', tokenSuccess.authToken);
				route('/profile');
			})
			.catch(err => {
				console.log(err);
			});
	}
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
};
