import config from '../config';
import { handleErrors } from './errors.api';

export const login = details =>
	fetch(`${config.url}/api/login`, {
		method: 'POST',
		headers: config.configHeaders,
		body: JSON.stringify({ email: details.email, password: details.password })
	})
		.then(response => response.json())
		.then(handleErrors)
		.catch(error => {
			throw error;
		});
export const register = details =>
	fetch(`${config.url}/api/signup`, {
		method: 'POST',
		headers: config.configHeaders,
		body: JSON.stringify({
			first: details.firstName,
			last: details.lastName,
			email: details.email,
			password: details.password
		})
	})
		.then(response => response.json())
		.then(handleErrors)
		.catch(error => {
			throw error;
		});
export const apiGetNewToken = refreshToken =>
	fetch(`${config.url}/api/refreshToken`, {
		method: 'POST',
		headers: config.configHeaders,
		body: JSON.stringify({
			refreshToken
		})
	})
		.then(response => response.json())
		.then(handleErrors)
		.catch(error => {
			throw error;
		});
export const apiCheckToken = () => {
	let authToken = localStorage.getItem('authToken');
	return fetch(`${config.url}/api/checkToken`, {
		method: 'POST',
		headers: {
			...config.configHeaders,
			Authorization: 'Bearer ' + authToken
		}
	})
		.then(response => response.json())
		.then(handleErrors)
		.catch(error => {
			throw error;
		});
};
export const apiGetAllTokens = () => {
	let authToken = localStorage.getItem('authToken');
	return fetch(`${config.url}/api/getAllTokens`, {
		method: 'POST',
		headers: {
			...config.configHeaders,
			Authorization: 'Bearer ' + authToken
		}
	})
		.then(response => response.json())
		.then(handleErrors)
		.catch(error => {
			throw error;
		});
};
