import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { cloudinary, storage } from "./cloudinary/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
	helmet({
		crossOriginResourcePolicy: { policy: "cross-origin" },
	})
);
app.use(morgan("common"));

cloudinary.uploader
	.upload(
		"https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
		{ public_id: "olympic_flag" }
	)
	.then(() => {
		console.log("Upload succesful");
	})
	.catch((err) => {
		console.log(err);
	});
