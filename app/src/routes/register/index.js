import { h, Component } from 'preact';
// import { compose } from 'redux';
import { route } from 'preact-router';
import style from './style';
import { register } from '../../api/auth.api';
import mutationState from '../../components/mutateLoadingComponent';

import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

class Register extends Component {
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
		let datav = this.state;
		this.props.registerUser({
			firstn: datav.firstName,
			lastn: datav.lastName,
			emaila: datav.email,
			password: datav.password
		});

		// register(this.state)
		// 	.then(response => {
		// 		route('/');
		// 	})
		// 	.catch(err => {
		// 		this.setState({
		// 			registerError: err.message
		// 		});
		// 	});
		e.preventDefault();
	}
	render({ mutation }, {}) {
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
				{mutation.loading && <div>loading</div>}

				{mutation.error && <p class="errorNotice"> {mutation.error} </p>}
			</div>
		);
	}
}

const registerMutation = gql`
	mutation(
		$firstn: String!
		$lastn: String!
		$emaila: String!
		$password: String!
	) {
		registerUser( # the mutation name on server
			first: $firstn
			last: $lastn
			email: $emaila
			password: $password
		) {
			first
			last
			email
		}
	}
`;

const gqlWrapper = graphql(registerMutation, {
	props: ({ mutate, ownProps }) => ({
		registerUser: userDetails => {
			const { mutation } = ownProps;
			mutation.set({ loading: true });
			mutate({
				variables: { ...userDetails }
				// need to update cache after registering so new user is added to cache?
			})
				.then(userData => {
					route('/');
					mutation.set({ loading: false });
				})
				.catch(err => {
					mutation.set({ loading: false, error: err });
				});
		}
	})
});

export default compose(mutationState(), gqlWrapper)(Register);
