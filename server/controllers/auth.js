import User from "../models/user.js";
import passport from "passport";
import ExpressError, { errorTypes } from "../utils/ExpressError.js";

export const registerUser = (req, res, next) => {
	const { email, username, password } = req.body;

	if (!email || !username || !password) {
		return next(
			new ExpressError(
				"Missing registration credentials",
				errorTypes.GENERAL,
				400
			)
		);
	}

	const user = new User({ email, username });
	User.register(user, password, (err) => {
		if (err) {
			console.log(`Error registering user!`, err);
			return next(
				new ExpressError("Failed to register", errorTypes.GENERAL)
			);
		}

		console.log(`Successfully registered a user with email: ${email}`);
		res.status(200).json({ message: "Registration successful" });
	});
};

export const authenticateLocal = function (req, res, next) {
	passport.authenticate("local", function (err, user, info) {
		if (err) {
			return next(new ExpressError(err.message, errorTypes.GENERAL));
		}

		if (!user) {
			return next(
				new ExpressError("Invalid credentials", errorTypes.GENERAL, 401)
			);
		}

		req.login(user, function (error) {
			if (error) {
				return next(new ExpressError(err.message, errorTypes.GENERAL));
			}
			return next();
		});
	})(req, res, next);
};
