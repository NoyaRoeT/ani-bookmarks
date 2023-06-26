import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import { BookmarkForm, Page } from "../components";
import { editBookmark, getBookmark } from "../utils/bookmarks";

const Edit = () => {
	const { bookmarkId } = useParams();
	const locationState = useLocation().state;
	const emptyBookmark = {
		title: "",
		type: "",
		genres: [],
		tags: [],
		rating: 0,
		requireFetch: true,
	};

	const [bookmark, setBookmark] = useState(
		locationState ? locationState.bookmark : emptyBookmark
	);

	const bookmarkExists = Boolean(bookmark._id) || bookmark.requireFetch; //requireFetch checks if bookmark is being fetched, ._id if fetch is done
	useEffect(() => {
		if (!bookmark._id) {
			(async () => {
				try {
					const res = await getBookmark(bookmarkId);
					setBookmark(res.data);
				} catch (err) {
					setBookmark((prev) => ({ ...prev, requireFetch: false }));
					console.log(err.response.data);
				}
			})();
		}
	}, []);

	async function editHandler(data) {
		try {
			const res = await editBookmark(data, bookmark._id);
			console.log(res);
		} catch (err) {
			console.log(err.response.data);
		}
	}

	return (
		<Page>
			{/* Should only render edit form if bookmark is already loaded */}
			{bookmark._id && (
				<BookmarkForm
					onSubmit={editHandler}
					buttonLabel="Save"
					label={"Edit a Bookmark"}
					bookmark={bookmark}
				/>
			)}
			{!bookmarkExists && (
				<Container maxWidth="lg" sx={{ mt: 3 }}>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						sx={{ height: 520 }}
					>
						<Typography variant="h6" textAlign="center">
							This bookmark does not exist...
						</Typography>
					</Box>
				</Container>
			)}
		</Page>
	);
};

export default Edit;
