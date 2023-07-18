import React from "react";
import {
	CardContent,
	CardMedia,
	Box,
	Typography,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import Carousel from "react-multi-carousel";

const CarouselCard = ({ image, label, description }) => {
	const theme = useTheme();
	const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const descCutOff = isLgScreen ? 600 : 400;
	return (
		<Box sx={{ width: 1, height: 480, position: "relative" }}>
			<CardMedia
				component="div"
				sx={{
					width: 1,
					height: 1,
					backgroundColor: "rgba(0, 0, 0, 0.4)",
					backgroundBlendMode: "darken",
				}}
				image={image}
			/>
			<Box
				sx={{
					position: "absolute",
					bottom: 0,
					left: 0,
					color: "white",
					p: 2,
				}}
			>
				<CardContent>
					<Typography
						variant="h6"
						sx={{
							textShadow: "rgba(0,0,0,.8) 1px 1px 0",
						}}
					>
						{label}
					</Typography>
					<Typography variant="body2">
						{description.length > descCutOff
							? description.substring(0, descCutOff) + "..."
							: description}
					</Typography>
				</CardContent>
			</Box>
		</Box>
	);
};

const FeaturedCarousel = ({ sx, title, items }) => {
	const responsive = {
		a: {
			breakpoint: { max: 4000, min: 0 },
			items: 1,
		},
	};
	return (
		<Box sx={{ ...sx, position: "relative" }}>
			<Box
				sx={{
					position: "absolute",
					px: 2,
					top: 0,
					left: 0,
					zIndex: 10,
					color: "white",
				}}
			>
				<CardContent>
					<Typography
						variant="h5"
						sx={{
							textShadow: "rgba(0,0,0,.8) 1px 1px 0",
						}}
					>
						{title}
					</Typography>
				</CardContent>
			</Box>
			{items && (
				<Carousel responsive={responsive}>
					{items.map((i) => (
						<CarouselCard
							label={i.label}
							description={i.description}
							image={i.image}
						/>
					))}
				</Carousel>
			)}
		</Box>
	);
};

export default FeaturedCarousel;
