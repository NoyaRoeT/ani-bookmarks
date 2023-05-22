import React, { useState } from "react";
import {
	Box,
	Dialog,
	DialogContent,
	Divider,
	Button,
	FormControl,
	TextField,
	DialogTitle,
	Grid,
} from "@mui/material";
import { ComboBox } from "../";

const BookmarkForm = ({ label, bookmark }) => {
	const [imageUrl, setImageUrl] = useState();
	const [chosenGenres, setChosenGenres] = useState([]);
	const [chosenTags, setChosenTags] = useState([]);

	function genresChangeHandler(value) {
		setChosenGenres(value);
	}

	function tagsChangeHandler(value) {
		setChosenTags(value);
	}

	function imageChangeHandler(event) {
		const file = event.target.files[0];
		if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
			return;
		}
		imageUrl && URL.revokeObjectURL(imageUrl);
		setImageUrl(URL.createObjectURL(file));
	}

	return (
		<Dialog scroll="body" fullWidth open maxWidth="md">
			<DialogTitle>{label}</DialogTitle>
			<DialogContent>
				<Grid container>
					<Grid item xs={12} md={3}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Box
								sx={{ my: "12px" }}
								maxWidth={"244px"}
								minWidth={"224px"}
							>
								<img
									width={"100%"}
									height={"300px"}
									style={{ objectFit: "cover" }}
									src={
										imageUrl
											? imageUrl
											: "https://via.placeholder.com/400"
									}
								/>
							</Box>
							<FormControl>
								<Button variant="contained" component="label">
									Upload Image
									<input
										type="file"
										accept="image/*"
										hidden
										onChange={imageChangeHandler}
									/>
								</Button>
							</FormControl>
						</Box>
					</Grid>
					<Divider
						sx={{
							mx: "24px",
							display: { xs: "none", md: "block" },
						}}
						flexItem
						orientation="vertical"
					/>
					<Grid item xs={12} md={8}>
						<Box>
							<TextField
								margin="normal"
								required
								fullWidth
								id="title"
								label="Title"
								name="title"
								autoFocus
							/>
							<ComboBox
								onChange={genresChangeHandler}
								label={"Genre"}
							/>
							<ComboBox
								onChange={tagsChangeHandler}
								label={"Tags"}
							/>
						</Box>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};

export default BookmarkForm;
