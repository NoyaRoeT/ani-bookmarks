import express from "express";
import { authenticateLocal, registerUser } from "../controllers/auth.js";
import ExpressError, { errorTypes } from "../utils/ExpressError.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", authenticateLocal, (req, res) => {
	res.status(200).json({
		message: `logged in as ${req.user.username}`,
	});
});

router.post("/logout", (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			const errMessage = err.message;
			const errType = errorTypes.GENERAL;
			return next(new ExpressError(errMessage, errType));
		}
		return res.status(200).json({ message: "Successfully logged out" });
	});
});

export default router;
