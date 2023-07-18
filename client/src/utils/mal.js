import axiosInstance from "./axios";

export async function getTopAiringAnime() {
	const res = await axiosInstance.get("/mal/anime/top_airing");
	return res.data;
}

export async function getTopSeasonalAnime() {
	const res = await axiosInstance.get("/mal/anime/seasonal");
	return res.data;
}

export async function getPopularComics() {
	const res = await axiosInstance.get("/mal/manga/popular");
	return res.data;
}
