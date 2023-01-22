import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";

import authRouter from "./routes/auth.js";

/* CONFIGURATIONS */
const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
	helmet({
		crossOriginResourcePolicy: { policy: "cross-origin" },
	})
);
app.use(morgan("common"));

/* ROUTES */
app.use("/auth", authRouter);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		app.listen(PORT, () =>
			console.log(`Server listening on port: ${PORT}`)
		);
	})
	.catch((err) => console.log(err));
