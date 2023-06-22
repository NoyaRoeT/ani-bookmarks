import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
	Button,
	Toolbar,
	Typography,
	Grid,
	Container,
	Card,
	CardContent,
	CardMedia,
	Box,
	Rating,
	useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { GenreTagStack, Page, DeleteDialog } from "../components";

const Info = () => {
	const { bookmarkId } = useParams();
	const { bookmark } = useLocation().state;

	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	function toggleOpenDeleteHandler() {
		setIsDeleteOpen((prev) => !prev);
	}
	return (
		<>
			<Page>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "center",
					}}
				>
					<Button color="primary" variant="outlined" sx={{ mr: 1 }}>
						<EditIcon sx={{ mr: 1 }} />
						<Typography>Edit</Typography>
					</Button>
					<Button
						color="warning"
						variant="outlined"
						onClick={toggleOpenDeleteHandler}
					>
						<DeleteIcon sx={{ mr: 1 }} />
						<Typography>Delete</Typography>
					</Button>
				</Toolbar>

				<Container maxWidth="lg" sx={{ mt: 3 }}>
					<Card
						sx={{
							boxShadow:
								"rgba(90, 114, 123, 0.11) 0px 7px 30px 0px",
						}}
					>
						<CardContent>
							<Grid container maxWidth="lg">
								<Grid
									sx={{ pr: { md: 5 } }}
									item
									sm={12}
									md={5}
									display="flex"
									justifyContent="center"
								>
									<CardMedia
										component="img"
										sx={{
											objectFit: "fill",
											borderRadius: 2,
											maxHeight: 580,
										}}
										image={
											bookmark.imagePath
												? bookmark.imagePath
												: "https://images.alphacoders.com/129/1298385.jpg"
										}
									/>
								</Grid>

								<Grid item sm={12} md={7}>
									<Typography
										sx={{ mt: 2 }}
										variant="h2"
										fontSize={30}
									>
										{bookmark.title}
									</Typography>
									<Box sx={{ mt: 2 }} display="flex">
										<Rating
											value={4.5}
											precision={0.5}
											readOnly
											size="small"
										/>
										<Typography
											sx={{ ml: 1 }}
											color="primary"
											fontSize="12px"
											variant="subtitle2"
										>
											{bookmark.type} ({bookmark.rating})
										</Typography>
									</Box>
									<GenreTagStack
										sx={{ mt: 2 }}
										genres={bookmark.genres}
										tags={bookmark.tags}
									/>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Container>
			</Page>
			<DeleteDialog
				open={isDeleteOpen}
				onClose={toggleOpenDeleteHandler}
				onDelete={toggleOpenDeleteHandler}
			/>
		</>
	);
};

export default Info;
