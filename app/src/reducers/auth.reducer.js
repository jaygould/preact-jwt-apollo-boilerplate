// Actions
export const saveTokensToStore = (tokens, userInfo) => ({
	type: 'SAVE_TOKENS',
	tokens,
	userInfo
});

export const adminTokensReceived = tokens => ({
	type: 'ADMIN_TOKENS_RECEIVED',
	tokens
});

//Reducer
let initialState = {
	authToken: null,
	refreshToken: null,
	pendingRefreshingToken: null,
	firstName: null,
	lastName: null,
	emailAddress: null,
	tokenIsValid: true,
	adminAllTokens: []
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
		case 'INVALID_TOKEN':
			return {
				...state,
				tokenIsValid: false
			};
		case 'REFRESHING_TOKEN':
			return {
				...state,
				pendingRefreshingToken: true,
				tokenIsValid: false
			};
		case 'TOKEN_REFRESHED':
			return {
				...state,
				pendingRefreshingToken: null,
				tokenIsValid: true
			};
		case 'TOKEN_IS_VALID':
			return {
				...state,
				tokenIsValid: true
			};
		case 'ADMIN_TOKENS_RECEIVED':
			return {
				...state,
				adminAllTokens: action.tokens
			};

		default:
			return state;
	}
}
