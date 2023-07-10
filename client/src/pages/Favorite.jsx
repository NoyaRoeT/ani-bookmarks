import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import { Page, BookmarkList } from "../components";
import { getFavoriteBookmarks } from "../utils/bookmarks";

const Favorite = () => {
	const [bookmarks, setBookmarks] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await getFavoriteBookmarks();
				setBookmarks(res.data);
			} catch (err) {
				console.log(err.response.data);
			}
		})();
	}, []);

	return (
		<Page>
			<Container maxWidth="lg" sx={{ mt: 4 }}>
				<Box sx={{ mb: 4 }}>
					<Typography fontSize={30} variant="h1">
						Favorite Bookmarks
					</Typography>
				</Box>
			</Container>
			<BookmarkList bookmarks={bookmarks} />
		</Page>
	);
};

export default Favorite;
