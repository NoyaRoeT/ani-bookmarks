import * as Cloudinary from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import imagesDirPath from "./imagesDirPath.js";

if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

const cloudinary = Cloudinary.v2;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryUpload = async (filename) => {
	const filePath = path.join(imagesDirPath, filename);

	const res = await cloudinary.uploader.upload(filePath, {
		folder: "ani-bookmarks",
	});
	return res;
};

export default cloudinaryUpload;
