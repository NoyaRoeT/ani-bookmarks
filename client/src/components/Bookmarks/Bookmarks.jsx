import { Container } from "@mui/material";
import React, { useState } from "react";
import BookmarkList from "./BookmarkList/BookmarkList";

const bookmarks = [{ title: "Tensei Shitara Slime Datta Ken", type: "Manga" }];
const Bookmarks = () => {
	return (
		<Container sx={{ mt: "20px" }}>
			<BookmarkList bookmarks={bookmarks} />
		</Container>
	);
};

export default Bookmarks;
