import express from "express";
import { isAuthenticated, validateBody } from "../controllers/middleware.js";
import { authenticateLocal, registerUser } from "../controllers/auth.js";
import ExpressError, { errorTypes } from "../utils/ExpressError.js";
import SchemaStore from "../utils/SchemaStore.js";

function initRouter() {
	const router = express.Router();

	router.get("/checkAuth", isAuthenticated, (req, res) => {
		res.status(200).json({
			data: req.user,
		});
	});
	router.post(
		"/register",
		validateBody(SchemaStore.get("user")),
		registerUser
	);

	router.post("/login", authenticateLocal, (req, res) => {
		res.status(200).json({
			data: req.user,
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

	return router;
}

export default initRouter;
