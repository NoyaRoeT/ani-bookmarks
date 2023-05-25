import express from "express";
import {
	createBookmark,
	deleteBookmark,
	getBookmark,
	getBookmarks,
	getGenresAndTags,
	isBookmarkOwner,
	updateBookmark,
} from "../controllers/bookmarks.js";

import {
	deleteImageIfError,
	isAuthenticated,
	moveImageToCloud,
	parseGenreAndTagsToArray,
	uploadImageToDisk,
	validateBody,
} from "../controllers/middleware.js";
import SchemaStore from "../utils/SchemaStore.js";

function initRouter() {
	const router = express.Router();

	router.get("/", isAuthenticated, getBookmarks);

	router.get("/genresandtags", getGenresAndTags);

	router.get("/:bookmarkId", isAuthenticated, isBookmarkOwner, getBookmark);

	router.post(
		"/",
		isAuthenticated,
		uploadImageToDisk,
		parseGenreAndTagsToArray,
		validateBody(SchemaStore.get("bookmark")),
		moveImageToCloud,
		createBookmark,
		deleteImageIfError
	);

	router.put(
		"/:bookmarkId",
		isAuthenticated,
		isBookmarkOwner,
		uploadImageToDisk,
		parseGenreAndTagsToArray,
		validateBody(SchemaStore.get("bookmark")),
		moveImageToCloud,
		updateBookmark,
		deleteImageIfError
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
