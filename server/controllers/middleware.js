import ExpressError, { errorTypes } from "../utils/ExpressError.js";
import cloudinaryUpload, {
	cloudinaryDestroy,
} from "../utils/imageUpload/cloudinary.js";
import imagesDirPath from "../utils/imageUpload/imagesDirPath.js";
import uploadLocal from "../utils/imageUpload/uploadLocal.js";
import fs from "node:fs/promises";
import path from "path";

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

export const parseGenreAndTagsToArray = (req, res, next) => {
	if (req.body.genres) {
		req.body.genres = req.body.genres.split(",");
	} else {
		return next(
			new ExpressError("Missing genres array", errorTypes.GENERAL, 400)
		);
	}

	if (req.body.tags) {
		req.body.tags = req.body.tags.split(",");
	} else {
		delete req.body.tags;
	}
	return next();
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

export const moveImageToCloud = async (req, res, next) => {
	try {
		if (req.file) {
			req.image = await cloudinaryUpload(req.file.filename);
			await fs.unlink(path.join(imagesDirPath, req.file.filename));
			req.file.isDeleted = true;
		}
		return next();
	} catch (err) {
		return next(new ExpressError(err.message, errorTypes.GENERAL));
	}
};

export const deleteImageIfError = async (err, req, res, next) => {
	// isDeleted flag to indicate that image was already deleted from local disk
	try {
		if (req.image && !req.image.saved) {
			await cloudinaryDestroy(req.image.public_id);
		}

		if (req.file && !req.file.isDeleted) {
			await fs.unlink(path.join(imagesDirPath, req.file.filename));
		}
		return next(err);
	} catch (error) {
		console.log(`In deleteImageIfError::ERROR: ${error.message}`);
		return next(err);
	}
};
