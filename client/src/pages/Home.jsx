import React from "react";
import { Container } from "@mui/material";
import { BookmarkCarousel, FeaturedCarousel, Page } from "../components";

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
				<FeaturedCarousel sx={{ mb: 2 }} title="Trending Right Now" />
				<BookmarkCarousel
					sx={{ mb: 2 }}
					items={items}
					label="Recommended"
				/>
				<BookmarkCarousel
					sx={{ mb: 2 }}
					items={items}
					label="Recently Added"
				/>
			</Container>
		</Page>
	);
};

export default Home;
