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
					<label>
						Email:
						<input
							type="text"
							name="email"
							value={email}
							onChange={this.handleChange}
						/>
					</label>
					<label>
						Password:
						<input
							type="password"
							name="password"
							value={value}
							onChange={this.handleChange}
						/>
					</label>
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
