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
			lastName: null
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
				console.log(response);
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
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					<label>
						First name:
						<input
							type="text"
							name="firstName"
							value={this.state.firstName}
							onChange={this.handleChange}
						/>
					</label>
					<label>
						Last name:
						<input
							type="text"
							name="lastName"
							value={this.state.lastName}
							onChange={this.handleChange}
						/>
					</label>
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
			</div>
		);
	}
}
