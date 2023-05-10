import User from "../models/user.js";
import ExpressError, { errorTypes } from "../utils/ExpressError.js";

export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.userId);

		if (!user) {
			return next(
				new ExpressError(
					"This user does not exist",
					errorTypes.GENERAL,
					404
				)
			);
		}

		return res.status(200).json({ data: user });
	} catch (err) {
		return next(new ExpressError(err.message, errorTypes.GENERAL));
	}
};

export const updateUser = async (req, res, next) => {
	const { username, avatarUrl } = req.body;
	const user = await User.findById(req.params.userId);

	user.username = username;

	if (user.avatarUrl) {
		user.avatarUrl = avatarUrl;
	}

	try {
		await user.save();
		res.status(200).json({ message: "Successfully updated this user." });
	} catch (err) {
		next(new ExpressError(err.message, errorTypes.GENERAL));
	}
};
