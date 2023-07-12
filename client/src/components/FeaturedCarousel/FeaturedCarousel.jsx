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
						{description.substring(0, descCutOff) + "..."}
					</Typography>
				</CardContent>
			</Box>
		</Box>
	);
};

const FeaturedCarousel = ({ sx, title }) => {
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
			<Carousel responsive={responsive}>
				<CarouselCard
					label={"Jujutsu Kaisen Season 3"}
					description="The replaced content is scaled to maintain its aspect ratio while fitting within the element's content box. The entire object is made to fill the box, while preserving its aspect ratio, so the object will be letterboxed if its aspect ratio does not match the aspect ratio of the box. so the object will be letterboxed if its aspect ratio does not match the aspect ratio of the box. so the object will be letterboxed if its aspect ratio does not match the aspect ratio of the box. so the object will be letterboxed if its aspect ratio does not match the aspect ratio of the box."
					image="https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/05/10/jujutsu-kaisen-season-2-key-visual.jpeg"
				/>
			</Carousel>
		</Box>
	);
};

export default FeaturedCarousel;
