import { h, Component } from 'preact';
import { compose } from 'redux';
import { connect } from 'preact-redux';
import style from './style';
import {
	/*getAllTokens,*/ formatAdminTokens
} from '../../reducers/auth.service';
import { adminTokensReceived } from '../../reducers/auth.reducer';

import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

// Note: this file shows the setup of Redux from before the GraphQL client was
// added to get refresh token data for the admin area. Redux can still be used
// alongside GraphQL, and this shows the same functionality with both systems.

class Admin extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { client, receivedAdminTokens } = this.props;
		client
			.query({ query: AllRefreshTokens })
			.then(({ data }) => {
				let gqladminAllTokens = [];
				if (data && data.allUsers && data.allUsers.length) {
					gqladminAllTokens = formatAdminTokens(data.allUsers);
				}
				receivedAdminTokens(gqladminAllTokens);
			})
			.catch();
	}

	render({ adminAllTokens /*, gqladminAllTokens*/ }, {}) {
		return (
			<div class={style.profile}>
				<h1>Admin</h1>
				{adminAllTokens.length > 0 &&
					adminAllTokens.map(
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

// const gqlWrapper = graphql(AllRefreshTokens, {
// 	props: ({ ownProps, data }) => {
// 		let gqladminAllTokens = [];
// 		if (data && data.allUsers && data.allUsers.length) {
// 			gqladminAllTokens = formatAdminTokens(data.allUsers);
// 			ownProps.receivedAdminTokens(gqladminAllTokens);
// 		}
// 		console.log('before ownrops dispatch 1');
// 		// return {
// 		// 	...data,
// 		// 	gqladminAllTokens
// 		// };
// 	}
// });

function mapStateToProps(state, ownProps) {
	return {
		adminAllTokens: state.auth.adminAllTokens
	};
}

function mapDispatchToProps(dispatch) {
	return {
		receivedAdminTokens: tokens => {
			dispatch(adminTokensReceived(tokens));
		}
	};
}

// withApollo is used to enable the Apollo Client to be used within the component. This means
// data returned from the GraphQL query can be stored locally in Redux store (although Apollo Client
// can do this for you).

// Having Redux and gqlWrapper (above) composed together directly caused an infinite loop as
// updates to store caused new props to be added to the component which caused the dispatch action
// to fire.

const reduxWrapper = connect(mapStateToProps, mapDispatchToProps);
export default compose(reduxWrapper, withApollo)(Admin);
