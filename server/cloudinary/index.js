import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

export const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "my-otaku-library",
		allowedFormats: ["jpeg", "jpg", "png"],
	},
});

export { cloudinary };
