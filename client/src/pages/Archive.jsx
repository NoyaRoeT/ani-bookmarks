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
			{bookmarks.length > 0 && <BookmarkList bookmarks={bookmarks} />}
			{bookmarks.length === 0 && (
				<Container maxWidth="lg" sx={{ mt: 3 }}>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						sx={{ height: 520 }}
					>
						<Typography variant="h6" textAlign="center">
							No bookmarks were found...
						</Typography>
					</Box>
				</Container>
			)}
		</Page>
	);
};

export default Archive;
