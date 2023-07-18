import express from "express";
import MALClient from "../utils/services/MALClient.js";
import ExpressError, { errorTypes } from "../utils/ExpressError.js";

function getSeason(month) {
	if (0 <= month && month < 3) return "winter";
	else if (3 <= month && month < 6) return "spring";
	else if (6 <= month && month < 9) return "summer";
	else if (9 <= month && month < 11) return "fall";
	else return -1;
}

function initRouter() {
	const router = express.Router();

	router.get("/anime/top_airing", async (req, res, next) => {
		const endpoint = "anime/ranking?ranking_type=airing&limit=30";
		try {
			const results = await MALClient.get(endpoint);
			const response = results.data.data.map((i) => i.node);
			return res.status(200).json(response);
		} catch (err) {
			next(
				new ExpressError(
					err.response.data.message,
					errorTypes.GENERAL,
					err.response.status
				)
			);
		}
	});

	router.get("/anime/seasonal", async (req, res, next) => {
		const currDate = new Date();
		const year = currDate.getFullYear();
		const season = getSeason(currDate.getMonth());

		const endpoint = `anime/season/${year}/${season}?limit=100&sort=anime_score&fields=start_season,popularity`;

		try {
			const results = await MALClient.get(endpoint);
			const startedRecently = results.data.data.filter(
				(i) =>
					i.node.start_season &&
					i.node.start_season.year == year &&
					i.node.start_season.season == season
			);
			const sortedByPopularity = startedRecently.sort((a, b) => {
				if (a.node.popularity < b.node.popularity) {
					return -1;
				} else {
					return 1;
				}
			});
			const limitToThirty = sortedByPopularity.slice(0, 30);
			const response = limitToThirty.map((i) => i.node);
			return res.status(200).json(response);
		} catch (err) {
			next(
				new ExpressError(
					err.response.data.message,
					errorTypes.GENERAL,
					err.response.status
				)
			);
		}
	});

	router.get("/manga/popular", async (req, res, next) => {
		const endpoint = "/manga/ranking?ranking_type=bypopularity&limit=30";
		try {
			const results = await MALClient.get(endpoint);
			const response = results.data.data.map((i) => i.node);
			return res.status(200).json(response);
		} catch (err) {
			next(
				new ExpressError(
					err.response.data.message,
					errorTypes.GENERAL,
					err.response.status
				)
			);
		}
	});

	return router;
}

export default initRouter;
