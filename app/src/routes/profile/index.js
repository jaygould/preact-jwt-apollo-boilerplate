import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style';
import { checkToken } from '../../reducers/auth.service';

export class Profile extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		this.props.checkToken(this.props.authToken);
	}

	render({ authToken, refreshToken }, {}) {
		return (
			<div class={style.profile}>
				{authToken && refreshToken ? (
					<div>
						<p>You're logged in.</p>
						<p>
							<a onClick={this.handleSubmit} href="#">
								Click here
							</a>{' '}
							to check your current token
						</p>
						<div class={style.tokens}>
							{authToken && (
								<div>
									<p>
										Auth token: <br />
										{authToken}
									</p>
								</div>
							)}
							{refreshToken && (
								<div>
									<p>
										Refresh token: <br />
										{refreshToken}
									</p>
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
		refreshToken: state.auth.refreshToken
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
