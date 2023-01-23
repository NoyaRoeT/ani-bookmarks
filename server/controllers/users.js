import User from "../models/user.js";
import ExpressError from "../utils/ExpressError.js";

export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.userId);

		if (!user) {
			return res
				.status(404)
				.json({ message: "This user does not exist." });
		}

		return res.status(200).json({ data: user, status: 200 });
	} catch (err) {
		next(new ExpressError("Something went wrong!", 500));
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
		next(new ExpressError("Something went wrong!", 500));
	}
};
