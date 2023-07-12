import React from "react";
import { Container } from "@mui/material";
import { BookmarkCarousel, Page } from "../components";

const items = [];
for (let i = 0; i != 12; ++i) {
	items.push({
		image: "https://static.zerochan.net/Makima.full.2930187.jpg",
		text: "Chainsaw Man",
	});
}

const Home = () => {
	return (
		<Page>
			<Container maxWidth="lg" sx={{ mt: 3 }}>
				<BookmarkCarousel items={items} label="Recently Added" />
				<BookmarkCarousel items={items} label="Recommended" />
				<BookmarkCarousel items={items} label="Favorites" />
			</Container>
		</Page>
	);
};

export default Home;
