import React from "react";
import {
	Grid,
	Typography,
	Card,
	CardMedia,
	CardContent,
	CardActionArea,
} from "@mui/material";

const BookmarkCard = ({ bookmark }) => {
	return (
		<Grid
			sx={{
				textAlign: "center",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				p: "15px",
			}}
			item
			xs={12}
			sm={6}
			md={4}
			lg={3}
		>
			<Card
				sx={{
					":hover": {
						boxShadow: 20,
					},
					borderRadius: 2,
					maxWidth: 260,
				}}
			>
				<CardActionArea>
					<CardMedia
						sx={{ height: 300 }}
						image="https://via.placeholder.com/400"
					/>
					<CardContent>
						<Typography gutterBottom variant="body2">
							Manga
						</Typography>
						<Typography noWrap variant="h6">
							Tensei Shitara Slime Datta Ken
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
};

export default BookmarkCard;
