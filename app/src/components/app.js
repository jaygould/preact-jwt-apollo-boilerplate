import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Router } from 'preact-router';

import Header from './header';
import Register from '../routes/register';
import Home from '../routes/home';
import Profile from '../routes/profile';
import Admin from '../routes/admin';

import { loadLocalUserAuth } from '../reducers/auth.service';

export class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	componentWillMount() {
		//loads user info from localStorage
		this.props.loadLocalUserAuth();
	}

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Register path="/register" />
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Admin path="/admin" />
				</Router>
			</div>
		);
	}
}
function mapStateToProps(state, ownProps) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		loadLocalUserAuth: () => {
			dispatch(loadLocalUserAuth());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
