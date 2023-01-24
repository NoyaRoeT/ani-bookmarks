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
		synopsis: {
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
		progress: Number,
		imageUrl: String,
		infoUrl: String,
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		whereToRead: String,
		comment: String,
	},
	{ timestamps: true }
);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
