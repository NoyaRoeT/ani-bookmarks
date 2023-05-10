import express from "express";
import {
	createBookmark,
	deleteBookmark,
	getBookmark,
	getBookmarks,
	isBookmarkOwner,
	updateBookmark,
} from "../controllers/bookmarks.js";

import { isAuthenticated, validateBody } from "../controllers/middleware.js";
import bookmarkSchema from "../schemas/bookmark.js";

const router = express.Router();

router.get("/", isAuthenticated, getBookmarks);

router.get("/:bookmarkId", isAuthenticated, isBookmarkOwner, getBookmark);

router.post("/", isAuthenticated, validateBody(bookmarkSchema), createBookmark);

router.put(
	"/:bookmarkId",
	isAuthenticated,
	isBookmarkOwner,
	validateBody(bookmarkSchema),
	updateBookmark
);

router.delete("/:bookmarkId", isAuthenticated, isBookmarkOwner, deleteBookmark);

export default router;
