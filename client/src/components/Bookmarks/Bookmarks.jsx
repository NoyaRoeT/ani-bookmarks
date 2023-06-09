import { Container, CircularProgress, Box, Paper } from "@mui/material";
import BookmarkList from "./BookmarkList/BookmarkList";
import { BookmarkContext } from "../../store/BookmarkContext";
import { useContext, useEffect } from "react";
import { FloatingAddButton } from "../";

const Bookmarks = () => {
	const ctx = useContext(BookmarkContext);

	useEffect(() => {
		const run = async () => {
			await ctx.getBookmarks();
		};
		run();
	}, [ctx.filter]);

	return (
		<>
			{!ctx.isLoading && (
				<Container
					disableGutters
					sx={{
						my: "24px",
					}}
				>
					<Paper
						sx={{
							p: "24px",
							width: "100%",
							minHeight: "85vh",
							borderRadius: 4,
						}}
					>
						<BookmarkList bookmarks={ctx.bookmarks} />
						<FloatingAddButton
							sx={{ position: "fixed", bottom: 20, right: 20 }}
						/>
					</Paper>
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
