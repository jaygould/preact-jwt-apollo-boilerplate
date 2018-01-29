import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { route } from 'preact-router';
import style from './style';
import { login } from '../../api/auth.api';
import { saveTokens } from '../../reducers/auth.service';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null,
			loginError: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.props.refreshExpired &&
			this.setState({ loginError: 'Your refresh token has expired.' });
	}

	handleChange(e) {
		const value = e.target.value;
		const name = e.target.name;
		this.setState({
			[name]: value
		});
	}

	handleSubmit(e) {
		login(this.state)
			.then(response => {
				this.props.saveTokens(response.authToken, response.refreshToken);
				route('/profile');
			})
			.catch(err => {
				this.setState({
					loginError: err.message
				});
			});
		e.preventDefault();
	}

	render({}, { email, value, loginError }) {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>
				<form onSubmit={this.handleSubmit}>
					<div class={style.inputWrap}>
						<label>Email:</label>
						<input
							type="text"
							name="email"
							value={email}
							onChange={this.handleChange}
						/>
					</div>
					<div class={style.inputWrap}>
						<label>Password:</label>
						<input
							type="password"
							name="password"
							value={value}
							onChange={this.handleChange}
						/>
					</div>

					<input type="submit" value="Submit" />
					{loginError && <p class="errorNotice"> {loginError} </p>}
				</form>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		saveTokens: (authToken, refreshToken) => {
			dispatch(saveTokens(authToken, refreshToken));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
