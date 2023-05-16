import React from "react";
import { Typography, Grid } from "@mui/material";

const BookmarkCard = ({ bookmark }) => {
	return (
		<Grid
			sx={{ border: "2px solid" }}
			item
			xs={12}
			sm={6}
			md={4}
			lg={3}
			xl={2}
		>
			<Typography variant="h5">{bookmark.title}</Typography>
		</Grid>
	);
};

export default BookmarkCard;
