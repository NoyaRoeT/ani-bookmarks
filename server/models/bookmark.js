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
		},
		genres: {
			type: [String],
			required: true,
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

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
