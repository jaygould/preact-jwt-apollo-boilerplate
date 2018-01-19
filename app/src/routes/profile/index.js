import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style';
import { checkToken } from '../../api/auth.api';

export class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authToken: null,
			refreshToken: null
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		console.log(this.props);
	}

	handleSubmit() {
		checkToken(this.state.authToken, this.state.refreshToken)
			.then(result => {
				console.log(result);
			})
			.catch(err => {
				console.log(err);
			});
	}

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
					<div>
						<p>You're logged in.</p>
						<p>
							<a onClick={this.handleSubmit} href="#">
								Click here
							</a>{' '}
							to check your current token
						</p>
						<div class={style.tokens}>
							{this.state.authToken && (
								<div>
									<p>
										Auth token: <br />
										{this.state.authToken}
									</p>
								</div>
							)}
							{this.state.refreshToken && (
								<div>
									<p>
										Refresh token: <br />
										{this.state.refreshToken}
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
		authToken: state.auth.authToken
	};
}

function mapDispatchToProps(dispatch) {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
