import Bookmark from "../models/bookmark.js";
import ExpressError from "../utils/ExpressError.js";

export const getBookmark = async (req, res, next) => {
	const reqBookmarkId = req.params.bookmarkId;

	if (!reqBookmarkId) {
		return res
			.status(400)
			.json({ message: "Missing bookmarkId parameter" });
	}

	try {
		const bookmark = await Bookmark.findById(reqBookmarkId);
		if (!bookmark) {
			return res
				.status(404)
				.json({ message: "This bookmark does not exist." });
		}
		return res.status(200).json({ data: bookmark });
	} catch (err) {
		next(new ExpressError(err.message, 500));
	}
};

export const createBookmark = async (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res
			.status(401)
			.json({ message: "Need to be logged in to create a bookmark." });
	}

	const user = req.user;
	const { title, genres, type } = req.body;

	if (!title || !genres || !type) {
		return res
			.status(400)
			.json({ message: "Missing required parameter(s)" });
	}
	// Genres is supposed to be an array. But an empty array is not falsy in js
	// pending fix

	const bookmark = new Bookmark({
		title,
		genres,
		type,
		userId: user._id,
	});

	try {
		await bookmark.save();
		return res.status(200).json({
			data: bookmark,
			message: "Successfully created the bookmark",
		});
	} catch (err) {
		next(new ExpressError(err.message, 500));
	}
};

export const updateBookmark = async (req, res, next) => {
	const reqBookmarkId = req.params.bookmarkId;
	if (!reqBookmarkId) {
		return res
			.status(400)
			.json({ message: "Missing bookmarkId parameter" });
	}
	try {
		const bookmark = await Bookmark.findById(reqBookmarkId);
		if (!bookmark) {
			return res
				.status(404)
				.json({ message: "This bookmark does not exist" });
		}

		const { title, genres, type } = req.body;

		bookmark.title = title;
		bookmark.genres = genres;
		bookmark.type = type;

		await bookmark.save();
		return res.status(200).json({
			data: bookmark,
			message: "Successfully updated the bookmark",
		});
	} catch (err) {
		next(new ExpressError(err.message, 500));
	}
};

export const deleteBookmark = async (req, res, next) => {
	const reqBookmarkId = req.params.bookmarkId;

	if (!reqBookmarkId) {
		return res
			.status(400)
			.json({ message: "Missing bookmarkId parameter" });
	}

	try {
		const bookmark = await Bookmark.findById(reqBookmarkId);
		if (!bookmark) {
			return res
				.status(404)
				.json({ message: "This bookmark does not exist" });
		}
		await bookmark.deleteOne();
		return res
			.status(200)
			.json({ message: "Successfully deleted this bookmark" });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

export const isBookmarkOwner = async (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(401).json({ message: "Need to be logged in" });
	}

	if (!req.params.bookmarkId) {
		return res
			.status(400)
			.json({ message: "Missing bookmarkId parameter" });
	}

	try {
		const bookmark = await Bookmark.findById(req.params.bookmarkId);
		if (!bookmark) {
			return res
				.status(404)
				.json({ message: "This bookmark does not exist" });
		}
		if (!req.user._id.equals(bookmark.userId)) {
			return res.status(401).json({
				message: "Not authorized to access this bookmark",
			});
		}
		next();
	} catch (err) {
		next(new ExpressError(err.message, 500));
	}
};
