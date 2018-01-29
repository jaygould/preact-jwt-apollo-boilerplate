import { h, Component } from 'preact';
import { route } from 'preact-router';
import style from './style';
import { register } from '../../api/auth.api';

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null,
			firstName: null,
			lastName: null,
			registerError: null
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
		register(this.state)
			.then(response => {
				route('/');
			})
			.catch(err => {
				this.setState({
					registerError: err.message
				});
			});
		e.preventDefault();
	}
	render({}, { registerError }) {
		return (
			<div class={style.home}>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					<div class={style.inputWrap}>
						<label>First name:</label>
						<input
							type="text"
							name="firstName"
							value={this.state.firstName}
							onChange={this.handleChange}
						/>
					</div>

					<div class={style.inputWrap}>
						<label>Last name:</label>
						<input
							type="text"
							name="lastName"
							value={this.state.lastName}
							onChange={this.handleChange}
						/>
					</div>

					<div class={style.inputWrap}>
						<label>Email:</label>
						<input
							type="text"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					</div>

					<div class={style.inputWrap}>
						<label>Password:</label>
						<input
							type="password"
							name="password"
							value={this.state.value}
							onChange={this.handleChange}
						/>
					</div>
					<input type="submit" value="Submit" />
				</form>
				{registerError && <p class="errorNotice"> {registerError} </p>}
			</div>
		);
	}
}
