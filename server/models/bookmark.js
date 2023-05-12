import mongoose from "mongoose";

const ANIME = 0;
const MANGA = 1;
const MANHWA = 2;
const MANHUA = 3;

const bookmarkSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 200,
		},
		genres: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
			required: true,
		},
		tags: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
		},
		type: {
			type: Number,
			required: true,
			enum: [ANIME, MANGA, MANHWA, MANHUA],
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		imagePath: {
			type: String,
		},
	},
	{ timestamps: true }
);

bookmarkSchema.path("genres").validate((val) => {
	const uniqueGenreIds = new Set(val.map((id) => id.toString()));
	return (
		val.length >= 1 && val.length <= 5 && uniqueGenreIds.size == val.length
	);
});

bookmarkSchema.path("tags").validate((val) => {
	if (val.length === 0) {
		return true;
	}
	const uniqueTagIds = new Set(val.map((id) => id.toString()));
	return val.length <= 20 && uniqueTagIds.size == val.length;
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
