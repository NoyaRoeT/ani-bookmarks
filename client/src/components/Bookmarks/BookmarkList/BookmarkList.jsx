import React from "react";
import Grid from "@mui/material/Grid";
import BookmarkCard from "../BookmarkCard/BookmarkCard";

const BookmarkList = ({ bookmarks }) => {
	return (
		<Grid container>
			{bookmarks.map((bookmark, i) => {
				return <BookmarkCard bookmark={bookmark} />;
			})}
		</Grid>
	);
};

export default BookmarkList;
