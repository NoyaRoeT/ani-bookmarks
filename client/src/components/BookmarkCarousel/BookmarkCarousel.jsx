import React from "react";
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Typography,
	useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselCard = ({ image, text, link }) => {
	return (
		<Card sx={{ width: "160px", height: "220px" }}>
			<CardActionArea
				component={Link}
				to={link}
				sx={{ position: "relative", height: 1 }}
			>
				<img
					width="160px"
					height="220px"
					src={
						image
							? image
							: "https://deconova.eu/wp-content/uploads/2016/02/default-placeholder.png"
					}
				/>
				<Box
					sx={{
						position: "absolute",
						bottom: 0,
						left: 0,
						pb: 1,
						pt: 2,
						px: 1,
						width: "160px",
					}}
					style={{
						background:
							"linear-gradient(transparent, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.7) 90%, black)",
					}}
				>
					<Typography
						fontSize="12px"
						color="white"
						sx={{
							textShadow: "rgba(0,0,0,.8) 1px 1px 0",
							overflowWrap: "break-word",
						}}
						variant="subtitle1"
						lineHeight={1}
						width={"100%"}
					>
						{text}
					</Typography>
				</Box>
			</CardActionArea>
		</Card>
	);
};

const BookmarkCarousel = ({ items, label, sx }) => {
	const theme = useTheme();

	const responsive = {
		lg: {
			breakpoint: {
				max: 4000,
				min: theme.breakpoints.values.lg,
			},
			items: 6,
			partialVisibilityGutter: 20,
			slidesToSlide: 3,
		},
		md_1: {
			breakpoint: {
				max: theme.breakpoints.values.lg,
				min: 1050,
			},
			items: 4.5,
			partialVisibilityGutter: 20,
			slidesToSlide: 3,
		},
		md_2: {
			breakpoint: {
				max: 1050,
				min: theme.breakpoints.values.md,
			},
			items: 4,
			partialVisibilityGutter: 20,
			slidesToSlide: 3,
		},
		sm_1: {
			breakpoint: {
				max: theme.breakpoints.values.md,
				min: 780,
			},
			items: 3,
			partialVisibilityGutter: 10,
			slidesToSlide: 3,
		},
		sm_2: {
			breakpoint: {
				max: 780,
				min: theme.breakpoints.values.sm,
			},
			items: 2.5,
			partialVisibilityGutter: 10,
			slidesToSlide: 2,
		},
		xs_1: {
			breakpoint: {
				max: theme.breakpoints.values.sm,
				min: 520,
			},
			items: 3,
			partialVisibilityGutter: 5,
			slidesToSlide: 3,
		},
		xs_2: {
			breakpoint: {
				max: 520,
				min: theme.breakpoints.values.xs,
			},
			items: 2.5,
			partialVisibilityGutter: 5,
			slidesToSlide: 2,
		},
	};

	return (
		<Card sx={{ ...sx }}>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{label}
				</Typography>
				{items && items.length > 0 && (
					<Carousel responsive={responsive} partialVisible={true}>
						{items.map((i) => (
							<CarouselCard
								key={i.text}
								image={i.image}
								text={i.text}
								link={i.link}
							/>
						))}
					</Carousel>
				)}
				{(!items || items.length <= 0) && (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "220px",
						}}
					>
						<Typography variant="h6">
							No data available...
						</Typography>
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

export default BookmarkCarousel;
