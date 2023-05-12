import ExpressError, { errorTypes } from "../utils/ExpressError.js";
import uploadLocal from "../utils/imageUpload/uploadLocal.js";

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

export const parseGenreStringToArray = (req, res, next) => {
	if (req.body.genres) {
		req.body.genres = req.body.genres.split(",");
		return next();
	}
	return next(
		new ExpressError("Missing genres array", errorTypes.GENERAL, 400)
	);
};

export const uploadImageToDisk = (req, res, next) => {
	const upload = uploadLocal.single("image");

	upload(req, res, function (err) {
		if (err) {
			return next(new ExpressError(err.message, errorTypes.GENERAL));
		}
		return next();
	});
};
