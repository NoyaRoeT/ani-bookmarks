import express from "express";
import { authenticateLocal, registerUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", authenticateLocal, (req, res) => {
	res.status(200).json({
		message: `logged in as ${req.user}`,
		session: req.session,
	});
});

router.get("/protected-route", (req, res) => {
	if (!req.isAuthenticated()) {
		res.status(400).json({ message: "Not authenticated" });
		return;
	}

	res.status(200).json({ message: `Welcome ${req.user.username}` });
});

export default router;
