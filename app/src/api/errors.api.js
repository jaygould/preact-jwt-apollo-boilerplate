import { store } from '../index';

export const handleErrors = response => {
	console.log(response);
	if (!response.success) {
		if (response.code && response.code === 'invalidToken') {
			store.dispatch({ type: 'INVALID_TOKEN' });
		}
		else if (response.code && response.code === 'refreshExpired') {
			store.dispatch({ type: 'REFRESH_EXPIRED' });
		}
		throw Error(response.message);
	}
	return response;
};
