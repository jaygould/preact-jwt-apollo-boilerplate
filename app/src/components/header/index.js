import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { Link } from 'preact-router/match';
import style from './style';

export class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>Jay's Preact and JWT with Apollo boilerplate</h1>
				<nav>
					<Link activeClassName={style.active} href="/register">
						Register
					</Link>
					<Link activeClassName={style.active} href="/">
						Home
					</Link>
					<Link activeClassName={style.active} href="/profile">
						Profile
					</Link>
					{this.props.authToken && (
						<Link activeClassName={style.active} href="/admin">
							Admin
						</Link>
					)}
				</nav>
			</header>
		);
	}
}
function mapStateToProps(state, ownProps) {
	return {
		authToken: state.auth.authToken
	};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
