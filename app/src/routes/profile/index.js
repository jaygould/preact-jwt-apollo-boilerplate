import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style';
import { checkToken } from '../../reducers/auth.service';

export class Profile extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			stateTokenRefreshed: null
		};
	}

	handleSubmit() {
		this.props.checkToken(this.props.authToken);
	}

	shouldComponentUpdate(np, ns) {
		if (np.tokenIsValid !== this.props.tokenIsValid) {
			if (this.props.tokenIsValid) {
				this.setState({
					stateTokenRefreshed: true
				});

				setTimeout(() => {
					this.setState({
						stateTokenRefreshed: false
					});
				}, 1000);
			}
		}
	}

	render(
		{ authToken, refreshToken, firstName, lastName, tokenIsValid },
		{ stateTokenRefreshed }
	) {
		return (
			<div class={style.profile}>
				<h1>Your tokens</h1>

				{authToken && refreshToken ? (
					<div>
						<p>
							Welcome back, {firstName} {lastName}. You're logged in.
						</p>
						<p>
							<a onClick={this.handleSubmit} href="#">
								Click here
							</a>{' '}
							to check your current token
						</p>
						<div>
							<span>
								{tokenIsValid ? (
									<span class={style.tokenValid}> Token Valid</span>
								) : (
									<span class={style.tokenNotValid}> Token not valid</span>
								)}
							</span>
							{stateTokenRefreshed && (
								<span class={style.tokenRefreshed}>Token refreshed</span>
							)}
						</div>
						<div class={style.tokens}>
							{authToken && (
								<div>
									<p>Auth token:</p>
									<div class={style.token}>{authToken}</div>
								</div>
							)}
							{refreshToken && (
								<div>
									<p>Refresh token:</p>
									<div class={style.token}>{refreshToken}</div>
								</div>
							)}
						</div>
					</div>
				) : (
					<p>Please go back and log in.</p>
				)}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		authToken: state.auth.authToken,
		refreshToken: state.auth.refreshToken,
		firstName: state.auth.firstName,
		lastName: state.auth.lastName,
		tokenIsValid: state.auth.tokenIsValid
	};
}

function mapDispatchToProps(dispatch) {
	return {
		checkToken: authToken => {
			dispatch(checkToken(authToken));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
