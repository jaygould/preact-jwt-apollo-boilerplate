const errorHandler = (errorMessage, errorCode) => {
	if (errorCode === 'invalidToken' || errorCode === 'refreshExpired') {
		return {
			success: false,
			message: errorMessage,
			code: errorCode
		};
	} else {
		return {
			success: false,
			message: errorMessage
		};
	}
};

module.exports = {
	errorHandler
};
