export const errorTypes = {
	UNAUTHORIZED: 0,
	GENERAL: 1,
};

class ExpressError extends Error {
	constructor(message, type, statusCode = 500) {
		super();
		this.message = message;
		this.type = type;
		this.status = statusCode;
	}
}

export default ExpressError;
