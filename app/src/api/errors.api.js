import { store } from '../index';

export const handleErrors = response => {
	if (response.status === 403) {
		store.dispatch({ type: 'INVALID_TOKEN' });
	}
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
};
