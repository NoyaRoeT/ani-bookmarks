import multer, { diskStorage } from "multer";
import path from "path";
import ExpressError, { errorTypes } from "../ExpressError.js";

const storage = diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const fileFilter = (req, file, cb) => {
	var ext = path.extname(file.originalname);
	if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
		return cb(
			new ExpressError("Only images are allowed", errorTypes.GENERAL)
		);
	}
	cb(null, true);
};

const limits = {
	fileSize: 1024 * 1024,
};

const uploadLocal = multer({ storage, fileFilter, limits });

export default uploadLocal;
