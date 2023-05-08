import express from "express";
import {
	createBookmark,
	deleteBookmark,
	getBookmark,
	isBookmarkOwner,
	updateBookmark,
} from "../controllers/bookmarks.js";

import { validateBody } from "../controllers/middleware.js";
import bookmarkSchema from "../schemas/bookmark.js";

const router = express.Router();

router.get("/:bookmarkId", getBookmark);

router.post("/", validateBody(bookmarkSchema), createBookmark);

router.put(
	"/:bookmarkId",
	isBookmarkOwner,
	validateBody(bookmarkSchema),
	updateBookmark
);

router.delete("/:bookmarkId", isBookmarkOwner, deleteBookmark);

export default router;
