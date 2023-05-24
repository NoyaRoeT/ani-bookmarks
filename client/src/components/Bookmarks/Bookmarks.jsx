import { Container } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import BookmarkList from "./BookmarkList/BookmarkList";
import { fetchBookmarks } from "../../services/bookmarks";
import { BookmarkContext } from "../../store/BookmarkContext";

const Bookmarks = () => {
	const ctx = useContext(BookmarkContext);

	useEffect(() => {
		const run = async () => {
			await ctx.getBookmarks();
		};
		run();
	}, []);

	return (
		<Container sx={{ mt: "20px" }}>
			<BookmarkList bookmarks={ctx.bookmarks} />
		</Container>
	);
};

export default Bookmarks;
