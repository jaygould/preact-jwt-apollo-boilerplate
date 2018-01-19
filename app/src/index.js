import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/app';
import auth from './reducers/auth.reducer';
import './style';

const store = createStore(
	combineReducers({
		auth
	}),
	applyMiddleware(thunk)
);

const Main = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

render(<Main />, document.body);
