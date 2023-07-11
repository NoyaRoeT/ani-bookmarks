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
				Home
				<BookmarkCarousel items={items} />
			</Container>
		</Page>
	);
};

export default Home;
