import {
	Card,
	Container,
	CardMedia,
	CardActionArea,
	Box,
	Typography,
	Rating,
	CardContent,
} from "@mui/material";
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
			<CardActionArea>
				<Link
					to={`/bookmarks/${123}}`}
					state={{ bookmark }}
					style={{ textDecoration: "none" }}
				>
					<CardContent>
						<Box sx={{ display: "flex" }}>
							<Box>
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
										{bookmark.type} ({bookmark.rating})
									</Typography>
								</Box>
							</Box>
							<Box sx={{ ml: 2 }}>
								<Typography variant="h6">
									{bookmark.title}
								</Typography>
								<GenreTagStack
									genres={bookmark.genres}
									tags={bookmark.tags}
								/>
							</Box>
						</Box>
					</CardContent>
				</Link>
			</CardActionArea>
		</Card>
	);
};

const BookmarkList = ({ bookmarks }) => {
	return (
		<Container sx={{ mt: 3 }} maxWidth="lg">
			{bookmarks.map((bookmark) => (
				<BookmarkCard key={bookmark._id} bookmark={bookmark} />
			))}
		</Container>
	);
};

export default BookmarkList;
