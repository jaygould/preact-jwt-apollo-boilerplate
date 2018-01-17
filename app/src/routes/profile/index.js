import { h, Component } from 'preact';
import style from './style';

export default class Profile extends Component {
	state = {
		authToken: null,
		refreshToken: null
	};

	componentWillMount() {
		let authToken = localStorage.getItem('authToken');
		let refreshToken = localStorage.getItem('refreshToken');
		this.setState({
			authToken,
			refreshToken
		});
	}

	render({}, { authToken, refreshToken }) {
		return (
			<div class={style.profile}>
				{authToken && refreshToken ? (
					<p>YAY</p>
				) : (
					<p>Please go back and log in.</p>
				)}
			</div>
		);
	}
}
