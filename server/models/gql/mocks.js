const mocks = {
	Query: () => ({
		user: (root, args) => {
			return { first: args.first, last: args.last };
		}
	})
};

module.exports = mocks;
