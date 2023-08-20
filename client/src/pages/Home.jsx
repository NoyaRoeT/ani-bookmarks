import React, { useState, useEffect } from "react";
import { BookmarkCarousel, ErrorFlash, Page } from "../components";
import {
	getPopularComics,
	getTopAiringAnime,
	getTopSeasonalAnime,
} from "../utils/mal";
import { getRecentlyAdded } from "../utils/bookmarks";

const Home = () => {
	const [topAiring, setTopAiring] = useState([]);
	const [topSeasonal, setTopSeasonal] = useState([]);
	const [malPopularComics, setMalPopularComics] = useState([]);
	const [recentlyAdded, setRecentlyAdded] = useState([]);

	const [error, setError] = useState("");
	const open = error.length !== 0;

	useEffect(() => {
		(async () => {
			try {
				let res = await getRecentlyAdded();
				res = res.data.map((i) => ({
					text: i.title,
					image: i.imagePath,
					link: `/bookmarks/info/${i._id}`,
				}));

				setRecentlyAdded(res);
				let topAiringRes = await getTopAiringAnime();
				topAiringRes = topAiringRes.map((i) => ({
					text: i.title,
					image: i.main_picture.medium,
					link: `https://myanimelist.net/anime/${i.id}`,
				}));
				setTopAiring(topAiringRes);

				let topSeasonalRes = await getTopSeasonalAnime();
				topSeasonalRes = topSeasonalRes.map((i) => ({
					text: i.title,
					image: i.main_picture.medium,
					link: `https://myanimelist.net/anime/${i.id}`,
				}));
				setTopSeasonal(topSeasonalRes);

				let malPopularComicsRes = await getPopularComics();
				malPopularComicsRes = malPopularComicsRes.map((i) => ({
					text: i.title,
					image: i.main_picture.medium,
					link: `https://myanimelist.net/manga/${i.id}`,
				}));
				setMalPopularComics(malPopularComicsRes);
			} catch (err) {
				if (err.response && err.response.status === 500) {
					setError("Something went wrong!");
				}
				console.log(err);
			}
		})();
	}, []);
	return (
		<>
			<ErrorFlash
				sx={{ width: { sm: "720px" }, ml: { sm: "120px" } }}
				open={open}
				onClose={() => setError("")}
				text={error}
			/>

			<BookmarkCarousel
				sx={{ mb: 2 }}
				items={recentlyAdded}
				label="Recently Added"
			/>
			<BookmarkCarousel
				sx={{ mb: 2 }}
				items={topAiring}
				label="Top Airing Anime from MyAnimeList"
			/>
			<BookmarkCarousel
				sx={{ mb: 2 }}
				items={topSeasonal}
				label="Seasonal Anime from MyAnimeList"
			/>

			<BookmarkCarousel
				sx={{ mb: 2 }}
				items={malPopularComics}
				label="Popular Comics from MyAnimeList"
			/>
		</>
	);
};

export default Home;
