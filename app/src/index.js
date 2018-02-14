import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { jwt } from './middleware';
import App from './components/app';
import auth from './reducers/auth.reducer';

import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

import { ApolloProvider } from 'react-apollo';

import './style';

export const store = createStore(
	combineReducers({
		auth
	}),
	applyMiddleware(jwt, thunk, logger)
);

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('authToken');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});
const httpLink = createHttpLink({
	uri: 'http://localhost:1138/graphql'
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

const Main = () => (
	<ApolloProvider client={client}>
		<Provider store={store}>
			<App />
		</Provider>
	</ApolloProvider>
);

render(<Main />, document.body);
