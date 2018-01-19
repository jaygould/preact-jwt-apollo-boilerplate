import { isTokenExpired, getNewToken } from './reducers/auth.service';

//TO DO - THE INTIIAL REQUEST DOESNT WORK SO IT NEEDS TO BE QUEUED
export const jwt = store => next => action => {
	if (action.type === 'INVALID_TOKEN') {
		let theStore = store.getState();
		if (
			theStore.auth &&
			theStore.auth.authToken &&
			isTokenExpired(theStore.auth.authToken)
		) {
			if (!theStore.auth.pendingRefreshingToken) {
				store.dispatch({ type: 'REFRESHING_TOKEN' });
				store.dispatch(getNewToken(theStore.auth.refreshToken)).then(resp => {
					store.dispatch({ type: 'TOKEN_REFRESHED' });
				});
			}
			else {
				//queue up async functions?
				//push each action to here and delete on the next action? Always keep a buffer and pop the buffer when token is refreshed?
			}
		}
	}
	else {
		return next(action);
	}
};
