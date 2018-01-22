// Actions
export const saveTokensToStore = (tokens, userInfo) => ({
	type: 'SAVE_TOKENS',
	tokens,
	userInfo
});

//Reducer
let initialState = {
	authToken: null,
	refreshToken: null,
	pendingRefreshingToken: null,
	firstName: null,
	lastName: null,
	emailAddress: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case 'SAVE_TOKENS':
			return {
				...state,
				authToken: action.tokens.authToken,
				refreshToken: action.tokens.refreshToken,
				firstName: action.userInfo.first,
				lastName: action.userInfo.last,
				emailAddress: action.userInfo.email
			};
		case 'REFRESHING_TOKEN':
			return {
				...state,
				pendingRefreshingToken: true
			};
		case 'TOKEN_REFRESHED':
			return {
				...state,
				pendingRefreshingToken: null
			};

		default:
			return state;
	}
}
