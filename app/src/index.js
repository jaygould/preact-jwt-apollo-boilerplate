import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { jwt } from './middleware';
import App from './components/app';
import auth from './reducers/auth.reducer';

import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';

import './style';

export const store = createStore(
	combineReducers({
		auth
	}),
	applyMiddleware(jwt, thunk, logger)
);

const client = new ApolloClient({
	// By default, this client will send queries to the
	//  `/graphql` endpoint on the same host
	// Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
	// to a different host
	link: new HttpLink({ uri: 'http://localhost:1138/graphql' }),
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
