import React from "react";
import { Container } from "@mui/material";
import { BookmarkCarousel, Page } from "../components";

const Home = () => {
	return (
		<Page>
			<Container maxWidth="lg" sx={{ mt: 3 }}>
				Home
				<BookmarkCarousel />
			</Container>
		</Page>
	);
};

export default Home;
