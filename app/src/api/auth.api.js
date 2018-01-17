import config from '../config';

export const login = details =>
	fetch(`${config.url}/api/login`, {
		method: 'POST',
		headers: config.configHeaders,
		body: JSON.stringify({ email: details.email, password: details.password })
	})
		.then(_handleErrors)
		.then(response => response.json())
		.catch(error => {
			throw error;
		});

const _handleErrors = response => {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
};
