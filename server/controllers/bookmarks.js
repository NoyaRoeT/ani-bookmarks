import Bookmark from "../models/bookmark.js";
import ExpressError, { errorTypes } from "../utils/ExpressError.js";
import GenreStore from "../utils/GenreStore.js";
import TagStore from "../utils/TagStore.js";

export const getBookmarks = async (req, res, next) => {
	try {
		const bookmarks = await Bookmark.find({ userId: req.user._id });
		return res.status(200).json({ data: bookmarks });
	} catch (err) {
		return next(new ExpressError(err.message, errorTypes.GENERAL));
	}
};

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
	const user = req.user;
	const { title, genres, type, tags = [] } = req.body;
	const bookmark = new Bookmark({
		title,
		genres: genres.map((name) => GenreStore.getMap()[name]),
		type,
		tags: tags.map((name) => TagStore.getMap()[name]),
		userId: user._id,
	});

	if (req.image) {
		bookmark.imageId = req.image.public_id;
		bookmark.imagePath = req.image.secure_url;
	}

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

		const { title, genres, type, tags = [] } = req.body;

		bookmark.title = title;
		bookmark.genres = genres.map((name) => GenreStore.getMap()[name]);
		bookmark.type = type;
		bookmark.tags = tags.map((name) => TagStore.getMap()[name]);

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
