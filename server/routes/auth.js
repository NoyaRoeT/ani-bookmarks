import express from "express";

const router = express.Router();

router.get("/login", (req, res, next) => {
	res.send("Hello Auth!");
});

export default router;
