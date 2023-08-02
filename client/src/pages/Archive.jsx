import React, { useState, useEffect, useContext } from "react";
import { Container, Box, Typography } from "@mui/material";
import { Page, BookmarkList, ErrorFlash } from "../components";
import { getArchivedBookmarks } from "../utils/bookmarks";
import { AuthContext } from "../context/AuthContext";

const Archive = () => {
	const [isFetching, setIsFetching] = useState(false);
	const [bookmarks, setBookmarks] = useState([]);
	const authContext = useContext(AuthContext);

	const [error, setError] = useState("");
	const open = error.length !== 0;

	useEffect(() => {
		(async () => {
			try {
				setIsFetching(true);
				const res = await getArchivedBookmarks();
				setBookmarks(res.data);
			} catch (err) {
				if (err.response && err.response.data.error.type == 0) {
					authContext.setUser(null);
				}
				if (err.response && err.response.status === 500) {
					setError("Something went wrong!");
				}
			} finally {
				setIsFetching(false);
			}
		})();
	}, []);

	return (
		<Page>
			<ErrorFlash
				sx={{ width: { sm: "720px" }, ml: { sm: "120px" } }}
				open={open}
				onClose={() => setError("")}
				text={error}
			/>
			<Container maxWidth="lg" sx={{ mt: 4 }}>
				<Box sx={{ mb: 4 }}>
					<Typography fontSize={30} variant="h1">
						Archived Bookmarks
					</Typography>
				</Box>
			</Container>
			<BookmarkList bookmarks={bookmarks} isFetching={isFetching} />
		</Page>
	);
};

export default Archive;
