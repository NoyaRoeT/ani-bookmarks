import React, { useState, useEffect, useContext } from "react";
import { Container, Box, Typography } from "@mui/material";
import { Page, BookmarkList } from "../components";
import { getArchivedBookmarks } from "../utils/bookmarks";
import { AuthContext } from "../context/AuthContext";

const Archive = () => {
	const [bookmarks, setBookmarks] = useState([]);
	const authContext = useContext(AuthContext);
	useEffect(() => {
		(async () => {
			try {
				const res = await getArchivedBookmarks();
				setBookmarks(res.data);
			} catch (err) {
				if (err.response && err.response.data.error.type == 0) {
					authContext.setUser(null);
				}
				console.log(err.response.data.error.message);
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
