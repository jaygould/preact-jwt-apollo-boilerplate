import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { jwt } from './middleware';
import App from './components/app';
import auth from './reducers/auth.reducer';
import './style';

export const store = createStore(
	combineReducers({
		auth
	}),
	applyMiddleware(jwt, thunk, logger)
);

const Main = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

render(<Main />, document.body);
