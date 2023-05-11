import ExpressError, { errorTypes } from "../utils/ExpressError.js";

export const isUser = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next(
			new ExpressError(
				"Need to be logged in to retrieve this information",
				401
			)
		);
	}

	const reqUserId = req.params.userId;
	const currUserId = req.user._id;

	if (!currUserId.equals(reqUserId)) {
		return next(
			new ExpressError("Not authorized to view this resource", 401)
		);
	}

	return next();
};

export const isAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next(
			new ExpressError("Not logged in", errorTypes.UNAUTHORIZED, 401)
		);
	}
	next();
};
export const validateBody = (schema) => {
	return (req, res, next) => {
		console.log(schema);
		const { error } = schema.validate(req.body);
		if (error) {
			return next(
				new ExpressError(
					error.details[0].message,
					errorTypes.GENERAL,
					400
				)
			);
		}
		next();
	};
};
