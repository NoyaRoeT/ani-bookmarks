import express from "express";
import {
	createBookmark,
	deleteBookmark,
	getBookmark,
	isBookmarkOwner,
	updateBookmark,
} from "../controllers/bookmarks.js";

const router = express.Router();

router.get("/:bookmarkId", getBookmark);

router.post("/", createBookmark);

router.put("/:bookmarkId", isBookmarkOwner, updateBookmark);

router.delete("/:bookmarkId", isBookmarkOwner, deleteBookmark);

export default router;
