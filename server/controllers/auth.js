import User from "../models/user.js";
import passport from "passport";

export const registerUser = (req, res, next) => {
	const { email, username, password } = req.body;
	const user = new User({ email, username });
	User.register(user, password, (err) => {
		if (err) {
			console.log(`Error registering user!`, err);
			res.status(400).json({ err });
			return;
		}

		console.log(`Successfully registered a user with email: ${email}`);
		res.status(200).json({ message: "Registration successful" });
	});
};

export const authenticateLocal = passport.authenticate("local", {
	failWithError: true,
});
