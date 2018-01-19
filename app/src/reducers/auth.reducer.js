// Actions
export const test = () => ({
	type: 'TEST',
	test: 'dsfsdoh'
});

//Reducer
let initialState = {
	authToken: null,
	accessToken: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case 'TEST':
			return {
				...state,
				authToken: action.test
			};

		default:
			return state;
	}
}
