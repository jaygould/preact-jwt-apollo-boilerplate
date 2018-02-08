import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style';
import { getAllTokens, formatAdminTokens } from '../../reducers/auth.service';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export class Admin extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		// this.props.getAllTokens();
	}

	render({ /*adminAllTokens,*/ gqladminAllTokens }, {}) {
		return (
			<div class={style.profile}>
				<h1>Admin</h1>
				{gqladminAllTokens.length > 0 &&
					gqladminAllTokens.map(
						user =>
							user &&
							user.refreshToken && (
								<div class={style.eachTokenWrap}>
									<div class={style.eachToken}>{user.refreshToken}</div>
									<div class={style.tokenDetails}>
										<p>User email: {user.email}</p>
										<p>Token expires {user.expiresIn}</p>
									</div>
								</div>
							)
					)}
			</div>
		);
	}
}

const AllRefreshTokens = gql`
	query {
		allUsers {
			refreshToken
			email
		}
	}
`;

const AdminWithData = graphql(AllRefreshTokens, {
	props: ({ ownProps, data }) => {
		let gqladminAllTokens = [];
		if (data && data.allUsers && data.allUsers.length) {
			gqladminAllTokens = formatAdminTokens(data.allUsers);
		}
		return {
			...data,
			gqladminAllTokens
		};
	}
})(Admin);

function mapStateToProps(state, ownProps) {
	return {
		// adminAllTokens: state.auth.adminAllTokens
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// getAllTokens: () => {
		// 	dispatch(getAllTokens());
		// }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminWithData);
