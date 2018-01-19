import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
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
				</nav>
			</header>
		);
	}
}
