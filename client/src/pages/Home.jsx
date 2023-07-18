import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { BookmarkCarousel, FeaturedCarousel, Page } from "../components";
import {
	getPopularComics,
	getTopAiringAnime,
	getTopSeasonalAnime,
} from "../utils/mal";

const items = [];
for (let i = 0; i != 12; ++i) {
	items.push({
		image: "https://static.zerochan.net/Makima.full.2930187.jpg",
		text: "Chainsaw Man",
	});
}

const Home = () => {
	const [topAiring, setTopAiring] = useState([]);
	const [topSeasonal, setTopSeasonal] = useState([]);
	const [malPopularComics, setMalPopularComics] = useState([]);

	useEffect(() => {
		(async () => {
			try {
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
				console.log(err);
			}
		})();
	}, []);
	return (
		<Page>
			<Container maxWidth="lg" sx={{ mt: 3 }}>
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
			</Container>
		</Page>
	);
};

export default Home;
