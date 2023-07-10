import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import { Page, BookmarkList } from "../components";
import { getArchivedBookmarks } from "../utils/bookmarks";

const Archive = () => {
	const [bookmarks, setBookmarks] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const res = await getArchivedBookmarks();
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
						Archived Bookmarks
					</Typography>
				</Box>
			</Container>
			<BookmarkList bookmarks={bookmarks} />
		</Page>
	);
};

export default Archive;
