import { Container } from "@mui/material";
import React from "react";
import BookmarkList from "./BookmarkList/BookmarkList";

const bookmarks = [
	{ title: "Bookmark" },
	{ title: "Bookmark" },
	{ title: "Bookmark" },
	{ title: "Bookmark" },
	{ title: "Bookmark" },
	{ title: "Bookmark" },
	{ title: "Bookmark" },
	{ title: "Bookmark" },
	{ title: "Bookmark" },
	{ title: "Bookmark" },
	{ title: "Bookmark" },
	{ title: "Bookmark" },
	{ title: "Bookmark" },
	{ title: "Bookmark" },
	{ title: "Bookmark" },
];

const Bookmarks = () => {
	return (
		<Container sx={{ mt: "20px" }}>
			<BookmarkList bookmarks={bookmarks} />
		</Container>
	);
};

export default Bookmarks;
