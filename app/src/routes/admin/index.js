import { h, Component } from 'preact';
import { compose } from 'redux';
import style from './style';
import { formatAdminTokens } from '../../reducers/auth.service';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// Note: this file shows the setup of Redux after the GraphQL client was
// added to get refresh token data for the admin area. The receiving of data
// is now done by using Apollo CLient instead of Redux, but the Redux code
// has been left in and commented out.

class Admin extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render({ gqladminAllTokens, loading }, {}) {
		let tokensWrap = loading
			? 'loading'
			: gqladminAllTokens.length > 0 &&
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
				);
		return (
			<div class={style.profile}>
				<h1>Admin</h1>
				{tokensWrap}
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

const gqlWrapper = graphql(AllRefreshTokens, {
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
});

export default compose(gqlWrapper)(Admin);
