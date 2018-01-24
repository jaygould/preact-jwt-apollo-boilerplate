import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style';
import { getAllTokens } from '../../reducers/auth.service';

export class Admin extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.getAllTokens();
	}

	render({ adminAllTokens }, {}) {
		return (
			<div class={style.profile}>
				<h1>Admin</h1>
				<p>View all tokens in the database</p>
				{adminAllTokens.length > 0 &&
					adminAllTokens.map(
						user =>
							user.refreshToken && (
								<div class={style.eachToken}>{user.refreshToken}</div>
							)
					)}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		adminAllTokens: state.auth.adminAllTokens
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllTokens: () => {
			dispatch(getAllTokens());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
