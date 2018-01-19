import config from '../config';
import { handleErrors } from './errors.api';

export const login = details =>
	fetch(`${config.url}/api/login`, {
		method: 'POST',
		headers: config.configHeaders,
		body: JSON.stringify({ email: details.email, password: details.password })
	})
		.then(handleErrors)
		.then(response => response.json())
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
		.then(handleErrors)
		.then(response => response.json())
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
		.then(handleErrors)
		.then(response => response.json())
		.catch(error => {
			throw error;
		});
export const apiCheckToken = authToken =>
	fetch(`${config.url}/api/getAll`, {
		method: 'POST',
		headers: {
			...config.configHeaders,
			Authorization: 'Bearer ' + authToken
		}
	})
		.then(handleErrors)
		.then(response => response.json())
		.catch(error => {
			throw error;
		});
