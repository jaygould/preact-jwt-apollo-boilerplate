import { h, Component } from 'preact';
import { route } from 'preact-router';
import style from './style';
import { login } from '../../api/auth.api';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null,
			authToken: null,
			refreshToken: null
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
				localStorage.setItem('authToken', response.authToken);
				localStorage.setItem('refreshToken', response.refreshToken);
				route('/profile');
			})
			.catch(err => {
				console.log(err);
			});
		e.preventDefault();
	}
	render() {
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
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</label>
					<label>
						Password:
						<input
							type="password"
							name="password"
							value={this.state.value}
							onChange={this.handleChange}
						/>
					</label>
					<input type="submit" value="Submit" />
				</form>
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
		);
	}
}
