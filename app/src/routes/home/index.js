import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '' };

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
		console.log('A name was submitted: ' + this.state);
		event.preventDefault();
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
			</div>
		);
	}
}
