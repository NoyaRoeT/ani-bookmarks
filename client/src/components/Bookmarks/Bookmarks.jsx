import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import BookmarkList from "./BookmarkList/BookmarkList";
import { fetchBookmarks } from "../../services/bookmarks";

const Bookmarks = () => {
	const [bookmarks, setBookmarks] = useState([]);
	useEffect(() => {
		async function getBookmarks() {
			const res = await fetchBookmarks();
			if (!res.error) {
				setBookmarks(res.data);
			}
		}
		getBookmarks();
	}, []);

	return (
		<Container sx={{ mt: "20px" }}>
			<BookmarkList bookmarks={bookmarks} />
		</Container>
	);
};

export default Bookmarks;
