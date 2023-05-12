import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import LocalStrategy from "passport-local";
import MongoStore from "connect-mongo";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import bookmarkRouter from "./routes/bookmarks.js";

import User from "./models/user.js";
import GenreStore from "./utils/GenreStore.js";
import TagStore from "./utils/TagStore.js";
import SchemaStore from "./utils/SchemaStore.js";
import bookmarkSchema from "./schemas/bookmark.js";

const PORT = process.env.PORT || 6001;
mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		startUp();
	})
	.catch((err) => console.log(err));

async function startUp() {
	await GenreStore.init();
	await TagStore.init();
	SchemaStore.addSchema("bookmark", bookmarkSchema);

	/* CONFIGURATIONS */
	const app = express();
	app.use(express.json({ limit: "30mb" }));
	app.use(express.urlencoded({ limit: "30mb", extended: true }));
	app.use(morgan("common"));

	/* CORS */
	app.use(cors({ origin: "http://localhost:5173", credentials: true }));

	/* SESSION SETUP */
	const sessionStore = MongoStore.create({ mongoUrl: process.env.MONGO_URL });
	app.use(
		session({
			secret: process.env.SECRET || "test",
			resave: false,
			saveUninitialized: true,
			store: sessionStore,
			cookie: {
				httpOnly: true,
				maxAge: 1000 * 60 * 60,
			},
		})
	);

	/* PASSPORT */
	passport.use(
		new LocalStrategy({ usernameField: "email" }, User.authenticate())
	);
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
	app.use(passport.initialize());
	app.use(passport.session());

	/* ROUTES */
	app.use("/auth", authRouter());
	app.use("/users", userRouter());
	app.use("/bookmarks", bookmarkRouter());
	app.use((err, req, res, next) => {
		res.status(err.status).json({
			error: { message: err.message, type: err.type },
		});
	});

	app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
}
