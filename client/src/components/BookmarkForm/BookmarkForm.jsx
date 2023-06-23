import React, { useRef, useState } from "react";
import {
	Container,
	Typography,
	Box,
	Card,
	CardContent,
	CardMedia,
	Autocomplete,
	TextField,
	Select,
	FormControl,
	InputLabel,
	MenuItem,
	Rating,
	Button,
	RadioGroup,
	FormControlLabel,
	Radio,
} from "@mui/material";

const typeOptions = ["Type 1", "Loooooooooooooooooooooooong Type", "short"];
const genreOptions = ["Genre 1", "Looooooooooooooooooooooong Genre", "short"];
const tagOptions = ["Tag 1", "Looooooooooooooooooooooong Genre", "short"];
const BookmarkForm = ({ onSubmit }) => {
	// Field related state
	const [rating, setRating] = useState(0);
	function ratingHandler(event) {
		setRating(Number(event.target.value));
	}

	const titleRef = useRef();

	const [type, setType] = useState("");
	function typeHandler(event) {
		setType(event.target.value);
	}

	const [genres, setGenres] = useState([]);
	function genresHandler(event, value) {
		setGenres(value);
	}

	const [tags, setTags] = useState([]);
	function tagsHandler(event, value) {
		setTags(value);
	}

	// Image related state
	const [uploadOption, setUploadOption] = useState("local");

	const [localUpload, setLocalUpload] = useState(null);
	const [localUploadError, setLocalUploadError] = useState("");

	const [imageUrl, setImageUrl] = useState("");

	const [previewUrl, setPreviewUrl] = useState("");

	// Image related change handlers
	function uploadOptionHandler(event) {
		setUploadOption(event.target.value);

		// Reset when upload option is changed
		setImageUrl("");
		setLocalUploadError("");
		setLocalUpload(null);

		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			setPreviewUrl(undefined);
		}
	}

	function localUploadHandler(event) {
		const file = event.target.files[0];
		if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
			if (previewUrl) {
				previewUrl && URL.revokeObjectURL(previewUrl);
				previewUrl && setPreviewUrl("");
			}
			setLocalUploadError("Image should be of type jpg/jpeg/png/gif.");
			return;
		}

		previewUrl && URL.revokeObjectURL(previewUrl);
		setPreviewUrl(URL.createObjectURL(file));
		setLocalUpload(event.target.files[0]);
		setLocalUploadError(""); // Remove upload error feedback on success
	}

	function imageUrlHandler(event) {
		setImageUrl(event.target.value);
		setPreviewUrl(event.target.value);
	}

	// Form submission
	function submitHandler() {
		const bookmarkData = {
			title: titleRef.current.value,
			rating,
			genres,
			tags,
			type,
		};

		if (uploadOption === "local") {
			bookmarkData.image = localUpload;
		} else {
			bookmarkData.imageUrl = imageUrl;
		}

		onSubmit(bookmarkData);
	}
	return (
		<Container sx={{ mt: 4 }} maxWidth="lg">
			<Box sx={{ mb: 4 }}>
				<Typography fontSize={30} variant="h1">
					Add a Bookmark
				</Typography>
			</Box>
			<Card sx={{ mb: 4 }}>
				<CardContent sx={{ p: 4, mb: 2 }}>
					<Box>
						<Typography variant="h6" fontSize={20}>
							Image
						</Typography>
					</Box>
					<Box>
						<RadioGroup
							row
							value={uploadOption}
							onChange={uploadOptionHandler}
						>
							<FormControlLabel
								value="local"
								control={<Radio />}
								label="Upload Local Image"
							/>
							<FormControlLabel
								value="url"
								control={<Radio />}
								label="Use Image Url"
							/>
						</RadioGroup>
						<Box display="flex" alignItems="center" sx={{ mb: 2 }}>
							{uploadOption === "local" && (
								<>
									<Button
										variant="contained"
										component="label"
										sx={{
											whiteSpace: "nowrap",
											minWidth: "max-content	",
										}}
									>
										Upload Image
										<input
											type="file"
											hidden
											accept="image/*"
											onChange={localUploadHandler}
										/>
									</Button>
									{localUpload && (
										<Typography
											display="flex"
											alignItems="center"
											sx={{ ml: 1 }}
										>
											{localUpload.name}
										</Typography>
									)}
									{localUploadError && (
										<Typography
											display="flex"
											alignItems="flex-end"
											color="error"
											sx={{ ml: 1 }}
										>
											({localUploadError})
										</Typography>
									)}
								</>
							)}

							{uploadOption === "url" && (
								<TextField
									fullWidth
									label="Enter image url"
									size="small"
									value={imageUrl}
									onChange={imageUrlHandler}
								/>
							)}
						</Box>

						<CardMedia
							component="img"
							sx={{
								objectFit: "contain",
								borderRadius: 2,
								maxHeight: 560,
							}}
							image={
								previewUrl
									? previewUrl
									: "https://pbs.twimg.com/media/FlXJnJjXkAEAJFs.jpg:large"
							}
						/>
					</Box>
					<Box sx={{ mt: 4 }}>
						<FormControl
							margin="normal"
							sx={{
								display: "flex",

								flexDirection: "row",
							}}
						>
							<Typography sx={{ mr: 1 }}>Rating</Typography>
							<Rating
								value={rating}
								onChange={ratingHandler}
								precision={0.5}
							/>
						</FormControl>
						<TextField
							margin="normal"
							variant="outlined"
							label="Title"
							required
							fullWidth
							inputRef={titleRef}
						/>

						<FormControl
							margin="normal"
							sx={{ minWidth: 120 }}
							required
						>
							<InputLabel id="type-select-label">Type</InputLabel>
							<Select
								label="Type"
								labelId="type-select-label"
								value={type}
								onChange={typeHandler}
							>
								{type && (
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
								)}
								{typeOptions.map((type) => {
									return (
										<MenuItem key={type} value={type}>
											{type}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>

						<Autocomplete
							value={genres}
							onChange={genresHandler}
							multiple
							disableClearable
							forcePopupIcon={false}
							options={genreOptions}
							renderInput={(params) => (
								<TextField
									{...params}
									margin="normal"
									variant="outlined"
									label="Genres"
									required
								/>
							)}
						/>

						<Autocomplete
							value={tags}
							onChange={tagsHandler}
							multiple
							disableClearable
							forcePopupIcon={false}
							options={tagOptions}
							renderInput={(params) => (
								<TextField
									{...params}
									margin="normal"
									variant="outlined"
									label="Tags"
								/>
							)}
						/>
					</Box>
					<Box sx={{ textAlign: "right" }}>
						<Button
							onClick={submitHandler}
							sx={{ mt: 2 }}
							variant="contained"
						>
							Add
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
};

export default BookmarkForm;
