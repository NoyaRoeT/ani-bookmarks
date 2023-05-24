import { Container } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import BookmarkList from "./BookmarkList/BookmarkList";
import { fetchBookmarks } from "../../services/bookmarks";
import { BookmarkContext } from "../../store/BookmarkContext";

const Bookmarks = () => {
	const ctx = useContext(BookmarkContext);

	useEffect(() => {
		async function getBookmarks() {
			const res = await fetchBookmarks();
			if (!res.error) {
				ctx.setBookmarks(res.data);
			}
		}
		getBookmarks();
	}, []);

	return (
		<Container sx={{ mt: "20px" }}>
			<BookmarkList bookmarks={ctx.bookmarks} />
		</Container>
	);
};

export default Bookmarks;
