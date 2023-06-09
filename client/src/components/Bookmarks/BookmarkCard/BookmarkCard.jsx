import React, { useState } from "react";
import {
	Grid,
	Typography,
	Card,
	CardMedia,
	CardContent,
	Rating,
} from "@mui/material";
import BookmarkInfo from "../../BookmarkInfo/BookmarkInfo";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const BookmarkCard = ({ bookmark }) => {
	const [showInfo, setShowInfo] = useState(false);

	return (
		<>
			<Grid
				sx={{
					textAlign: "center",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					p: "12px",
				}}
				item
				xs={12}
				sm={6}
				md={4}
				lg={3}
				xl={12 / 5}
			>
				<Card
					sx={{
						":hover": {
							cursor: "pointer",
							boxShadow: 5,
							transform: "scale(1.05)",
							zIndex: 100,
						},
						borderRadius: 2,
						width: "280px",
						position: "relative",
					}}
					onClick={() => {
						setShowInfo(true);
					}}
				>
					<CardMedia
						sx={{ height: "280px" }}
						image={
							bookmark.imagePath
								? bookmark.imagePath
								: "https://via.placeholder.com/400"
						}
					/>
					<CardContent
						sx={{
							zIndex: 2,
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
							bgcolor: "grey.700",
							p: "8px",
							"&:last-child": {
								pb: "8px",
							},
						}}
					>
						<Rating readOnly size="small" value={bookmark.rating} />
						<Typography
							sx={{ color: "#f9d3b4", fontSize: "16px" }}
							noWrap
							variant="h6"
						>
							{bookmark.title}
						</Typography>
					</CardContent>
				</Card>
			</Grid>
			{showInfo && (
				<BookmarkInfo
					bookmark={bookmark}
					open={showInfo}
					onClose={() => setShowInfo(false)}
				/>
			)}
		</>
	);
};

export default BookmarkCard;
