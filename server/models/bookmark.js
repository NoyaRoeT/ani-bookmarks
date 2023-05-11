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
			unique: true,
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
	},
	{ timestamps: true }
);

bookmarkSchema.path("genres").validate((val) => {
	const uniqueGenreIds = new Set(val.map((id) => id.toString()));
	return val.length >= 1 && uniqueGenreIds.size == val.length;
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
