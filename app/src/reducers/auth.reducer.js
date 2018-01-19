// Actions
export const saveTokensToStore = tokens => ({
	type: 'SAVE_TOKENS',
	tokens
});

//Reducer
let initialState = {
	authToken: null,
	refreshToken: null,
	pendingRefreshingToken: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case 'SAVE_TOKENS':
			return {
				...state,
				authToken: action.tokens.authToken,
				refreshToken: action.tokens.refreshToken
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
