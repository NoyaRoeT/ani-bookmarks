import {
	Card,
	Container,
	CardMedia,
	Box,
	Typography,
	Rating,
	CardContent,
	IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import GenreTagStack from "../GenreTagStack/GenreTagStack";
import { Link } from "react-router-dom";

const BookmarkCard = ({ bookmark }) => {
	return (
		<Card
			sx={{
				mb: 2,
			}}
		>
			<CardContent>
				<Box sx={{ display: "flex" }}>
					<Box>
						<Link
							to={`/bookmarks/info/${bookmark._id}`}
							state={{ bookmark }}
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<CardMedia
								component="img"
								sx={{
									height: 160,
									width: 120,
									objectFit: "cover",
									borderRadius: 2,
								}}
								image={
									bookmark.imagePath
										? bookmark.imagePath
										: "https://cdn.novelupdates.com/imgmid/series_10553.jpg"
								}
							/>
						</Link>
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
								sx={{
									display: "flex",
									alignItems: "center",
								}}
							>
								{bookmark.favorite && (
									<FavoriteIcon
										sx={{
											fontSize: "12px",
											color: "red",
											mr: 0.5,
										}}
									/>
								)}
								{bookmark.type} ({bookmark.rating})
							</Typography>
						</Box>
					</Box>
					<Box sx={{ ml: 2, width: 1 }}>
						<Typography
							component={Link}
							to={`/bookmarks/info/${bookmark._id}`}
							state={{ bookmark }}
							style={{
								textDecoration: "none",
								color: "inherit",
							}}
							variant="h6"
						>
							{bookmark.title}
						</Typography>

						<GenreTagStack
							genres={bookmark.genres}
							tags={bookmark.tags}
						/>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

const BookmarkList = ({ bookmarks }) => {
	return (
		<Container sx={{ mt: 3 }} maxWidth="lg">
			{bookmarks.map((bookmark) => (
				<BookmarkCard key={bookmark._id} bookmark={bookmark} />
			))}
			{bookmarks.length === 0 && (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					sx={{ height: 520 }}
				>
					<Typography variant="h6" textAlign="center">
						No bookmarks were found...
					</Typography>
				</Box>
			)}
		</Container>
	);
};

export default BookmarkList;
