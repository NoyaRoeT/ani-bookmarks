import React from "react";
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Container,
	Box,
} from "@mui/material";

const BookmarkInfo = () => {
	return (
		<Container>
			<Card sx={{ display: "flex" }}>
				<CardMedia
					component="img"
					height="300"
					image="https://via.placeholder.com/400"
				/>
				<CardContent>
					<Box display="flex">
						<Typography variant="h6">
							Tensei Shitara Slime Datta Ken&nbsp;
						</Typography>
						<Typography variant="h6"> by Fuze</Typography>
					</Box>
					<Typography variant="body1">
						In her previous life, Lou Mingyue was a legend in the
						imperial capital. At the age of 22, she was already a
						“super boss” standing at the top. Finally, she was
						eventually killed by her trusted aides and died at the
						age of twenty-five, becoming an unreachable peak in the
						hearts of countless people. When she opened her eyes
						again, rebirth after twenty years, she became a
						second-year student of Linnan No. 1 Middle School.
						Then——the primary school chickens shivered: “Jiang
						Fuyue, she got a perfect score in the exam again! The
						physics teacher came to her again for the answers! The
						math teacher said that she will have her give out the
						exam questions next month!”
					</Typography>
				</CardContent>
			</Card>
		</Container>
	);
};

export default BookmarkInfo;
