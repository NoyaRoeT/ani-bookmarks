import {
	Card,
	Container,
	CardMedia,
	CardActionArea,
	Box,
	Typography,
	Rating,
} from "@mui/material";
import React from "react";
import GenreTagStack from "../GenreTagStack/GenreTagStack";

const BookmarkCard = ({ bookmark }) => {
	return (
		<Card elevation={0} sx={{ mb: 2 }}>
			<CardActionArea>
				<Box sx={{ display: "flex" }}>
					<Box>
						<CardMedia
							component="img"
							sx={{
								height: 160,
								width: 120,
								objectFit: "fill",
							}}
							image={
								bookmark.imagePath
									? bookmark.imagePath
									: "https://cdn.novelupdates.com/imgmid/series_10553.jpg"
							}
						/>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								mt: 0.5,
							}}
						>
							<Rating
								size="small"
								precision={0.5}
								value={bookmark.rating}
								readOnly
								sx={{
									"& .MuiRating-icon": {
										width: "1rem",
									},
								}}
							/>
							<Typography
								color="primary"
								fontSize="12px"
								variant="subtitle2"
							>
								({bookmark.rating})
							</Typography>
						</Box>
					</Box>
					<Box sx={{ ml: 2 }}>
						<Typography variant="h6">{bookmark.title}</Typography>
						<GenreTagStack
							genres={bookmark.genres}
							tags={bookmark.tags}
						/>
					</Box>
				</Box>
			</CardActionArea>
		</Card>
	);
};

const BookmarkList = ({ bookmarks }) => {
	return (
		<Container sx={{ mt: 4 }} maxWidth="lg">
			{bookmarks.map((bookmark) => (
				<BookmarkCard bookmark={bookmark} />
			))}
		</Container>
	);
};

export default BookmarkList;
