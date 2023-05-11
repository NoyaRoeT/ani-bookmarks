import express from "express";

import { getUser, updateUser } from "../controllers/users.js";
import { isUser } from "../controllers/middleware.js";

function initRouter() {
	const router = express.Router();

	router.get("/:userId", getUser);

	router.put("/:userId", isUser, updateUser);

	return router;
}

export default initRouter;
