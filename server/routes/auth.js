import express from "express";
import { authenticateLocal, registerUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", authenticateLocal, (req, res) => {
	res.status(200).json({
		message: `logged in as ${req.user.username}`,
	});
});

router.get("/protected-route", (req, res) => {
	if (!req.isAuthenticated()) {
		res.status(400).json({ message: "Not authenticated" });
		return;
	}

	res.status(200).json({
		message: `Welcome ${req.user.username}`,
	});
});

router.post("/logout", (req, res) => {
	req.logout(function (err) {
		if (err) {
			return res.status(500).json({ message: err.message });
		}
		return res.status(200).json({ message: "Successfully logged out" });
	});
});

export default router;
