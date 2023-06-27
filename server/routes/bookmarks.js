import express from "express";
import {
	createBookmark,
	deleteBookmark,
	getBookmark,
	isBookmarkOwner,
	updateBookmark,
	searchBookmarks,
	getGenres,
	getTags,
	favoriteBookmark,
	getFavoriteBookmarks,
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

	router.get("/genres", getGenres);
	router.get("/tags", getTags);

	router.post(
		"/search",
		isAuthenticated,
		validateBody(SchemaStore.get("search")),
		searchBookmarks
	);

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

	router.get("/favorite", isAuthenticated, getFavoriteBookmarks);
	router.put(
		"/favorite/:bookmarkId",
		isAuthenticated,
		isBookmarkOwner,
		favoriteBookmark
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
