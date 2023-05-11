import Bookmark from "../models/bookmark.js";
import mongoose from "mongoose";

import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Connected to database");
	})
	.catch((err) => console.log(err));

async function deleteBookmarks() {
	await Bookmark.deleteMany({});
	const bookmarks = await Bookmark.find({});

	if (bookmarks.length == 0) {
		console.log("Deleted all bookmarks");
	} else {
		console.log("Failed to delete bookmarks");
	}
}

await deleteBookmarks();
