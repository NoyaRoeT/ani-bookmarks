import express from "express";
import {
	createBookmark,
	deleteBookmark,
	getBookmark,
	getBookmarks,
	isBookmarkOwner,
	updateBookmark,
} from "../controllers/bookmarks.js";

import {
	isAuthenticated,
	parseGenreStringToArray,
	uploadImageToDisk,
	validateBody,
} from "../controllers/middleware.js";
import SchemaStore from "../utils/SchemaStore.js";

function initRouter() {
	const router = express.Router();

	router.get("/", isAuthenticated, getBookmarks);

	router.get("/:bookmarkId", isAuthenticated, isBookmarkOwner, getBookmark);

	router.post(
		"/",
		isAuthenticated,
		uploadImageToDisk,
		parseGenreStringToArray,
		validateBody(SchemaStore.get("bookmark")),
		createBookmark
	);

	router.put(
		"/:bookmarkId",
		isAuthenticated,
		isBookmarkOwner,
		validateBody(SchemaStore.get("bookmark")),
		updateBookmark
	);

	router.delete(
		"/:bookmarkId",
		isAuthenticated,
		isBookmarkOwner,
		deleteBookmark
	);

	return router;
}

export default initRouter;
