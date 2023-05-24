import { Container, CircularProgress, Box } from "@mui/material";
import BookmarkList from "./BookmarkList/BookmarkList";
import { BookmarkContext } from "../../store/BookmarkContext";
import { useContext, useEffect } from "react";

const Bookmarks = () => {
	const ctx = useContext(BookmarkContext);

	useEffect(() => {
		const run = async () => {
			await ctx.getBookmarks();
		};
		run();
	}, []);

	return (
		<>
			{!ctx.isLoading && (
				<Container sx={{ mt: "20px" }}>
					<BookmarkList bookmarks={ctx.bookmarks} />
				</Container>
			)}
			{ctx.isLoading && (
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						marginTop: "-64px",
						ml: { xs: "-64px", sm: "0px" },
					}}
				>
					<CircularProgress size={128} />
				</Box>
			)}
		</>
	);
};

export default Bookmarks;
