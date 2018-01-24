import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style';
import { getAllTokens } from '../../reducers/auth.service';

export class Admin extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getAllTokens();
	}

	render({ authTokens, refreshTokens }, {}) {
		return (
			<div class={style.profile}>
				<h1>Admin</h1>
				<p>View all tokens in the database</p>
				{authTokens.map(token => <li>{token}</li>)}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		authTokens: state.auth.authTokens,
		refreshTokens: state.auth.refreshToken
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllTokens: authToken => {
			dispatch(getAllTokens(authToken));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
