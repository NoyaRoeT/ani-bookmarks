import React, { useEffect, useReducer, useState } from "react";
import {
	Container,
	Typography,
	Box,
	Card,
	CardContent,
	CardMedia,
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
	FormHelperText,
} from "@mui/material";
import { AsyncComboBox } from "../";
import { validateBookmark } from "../../utils/helper";
import { getTags, getGenres } from "../../utils/bookmarks";

const typeOptions = ["Anime", "Manga", "Manhwa", "Manhua", "Novel"];

const errorReducer = (state, action) => {
	if (action.type === "RESET") {
		return {
			title: "",
			type: "",
			genres: "",
			tags: "",
		};
	}
	if (action.type === "TITLE") {
		return {
			title: action.value,
			type: "",
			genres: "",
			tags: "",
		};
	}
	if (action.type === "TYPE") {
		return {
			title: "",
			type: action.value,
			genres: "",
			tags: "",
		};
	}
	if (action.type === "GENRES") {
		return {
			title: "",
			type: "",
			genres: action.value,
			tags: "",
		};
	}
	if (action.type === "TAGS") {
		return {
			title: "",
			type: "",
			genres: "",
			tags: action.value,
		};
	}
};

const BookmarkForm = ({
	onSubmit,
	buttonLabel,
	bookmark,
	label,
	onServerError,
}) => {
	// Field state
	const [rating, setRating] = useState(bookmark ? bookmark.rating : 0);
	function ratingHandler(event) {
		setRating(Number(event.target.value));
	}

	const [title, setTitle] = useState(bookmark ? bookmark.title : "");
	function titleHandler(event) {
		if (event.target.value.length <= 200) {
			setTitle(event.target.value);
		}
	}

	const [type, setType] = useState(bookmark ? bookmark.type : "");
	function typeHandler(event) {
		setType(event.target.value);
	}

	const [genres, setGenres] = useState(bookmark ? bookmark.genres : []);
	function genresHandler(event, value) {
		setGenres(value);
	}

	const [tags, setTags] = useState(bookmark ? bookmark.tags : []);
	function tagsHandler(event, value) {
		setTags(value);
	}

	// Error state
	const [error, dispatchError] = useReducer(errorReducer, {
		title: "",
		type: "",
		genres: "",
		tags: "",
	});

	// Image related state
	const [uploadOption, setUploadOption] = useState(
		bookmark && bookmark.imagePath ? "url" : "local"
	);

	const [localUpload, setLocalUpload] = useState(null);
	const [localUploadError, setLocalUploadError] = useState("");

	const [imageUrl, setImageUrl] = useState(
		bookmark && bookmark.imagePath ? bookmark.imagePath : ""
	);

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
			setLocalUploadError("Image should be of type jpg/jpeg/png/gif.");
			return;
		}

		const sizeLimit = 1024 * 1024;

		if (file.size > sizeLimit) {
			setLocalUploadError("Image was too large.");
			return;
		}

		previewUrl && URL.revokeObjectURL(previewUrl);
		setPreviewUrl(URL.createObjectURL(file));
		setLocalUpload(event.target.files[0]);
		setLocalUploadError(""); // Remove upload error feedback on success
	}

	function imageUrlHandler(event) {
		setImageUrl(event.target.value);
	}

	// Form submission
	function submitHandler() {
		const bookmarkData = {
			title,
			rating,
			genres,
			tags,
			type,
		};

		if (uploadOption === "local") {
			if (localUpload) {
				bookmarkData.image = localUpload;
			}
		} else {
			bookmarkData.imageUrl = imageUrl;
		}

		const { field, message } = validateBookmark(bookmarkData);

		if (field) {
			dispatchError({ type: field, value: message });
			return;
		}

		dispatchError({ type: "RESET" });

		onSubmit(bookmarkData);
	}

	useEffect(() => {
		if (uploadOption === "url") {
			const handler = setTimeout(() => {
				setPreviewUrl(imageUrl);
			}, 500);
			return () => {
				clearTimeout(handler);
			};
		}
	}, [imageUrl, uploadOption]);

	async function genresLoadFunction() {
		try {
			const res = await getGenres();
			return res.data;
		} catch (err) {
			onServerError("Something went wrong!");
			return [];
		}
	}

	async function tagsLoadFunction() {
		try {
			const res = await getTags();
			return res.data;
		} catch (err) {
			onServerError("Something went wrong!");
			return [];
		}
	}

	return (
		<Container sx={{ mt: 4 }} maxWidth="lg">
			<Box sx={{ mb: 4 }}>
				<Typography fontSize={30} variant="h1">
					{label}
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
									<Box
										sx={{
											ml: 1,
											display: "flex",
											alignItems: "center",
											flexGrow: 1,
										}}
									>
										{localUpload && (
											<Typography sx={{ width: 1 }}>
												{localUpload.name}{" "}
												{localUploadError && (
													<Typography
														color="error"
														component="span"
													>
														({localUploadError})
													</Typography>
												)}
											</Typography>
										)}
									</Box>
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
									: "https://deconova.eu/wp-content/uploads/2016/02/default-placeholder.png"
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
							value={title}
							onChange={titleHandler}
							error={error.title.length > 0}
							helperText={error.title}
						/>

						<FormControl
							margin="normal"
							sx={{ minWidth: 120 }}
							required
						>
							<InputLabel
								id="type-select-label"
								error={error.type.length > 0}
							>
								Type
							</InputLabel>
							<Select
								label="Type"
								labelId="type-select-label"
								value={type}
								onChange={typeHandler}
								error={error.type.length > 0}
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
							<FormHelperText error>{error.type}</FormHelperText>
						</FormControl>

						<AsyncComboBox
							value={genres}
							onChange={genresHandler}
							label="Genres"
							loadFunction={genresLoadFunction}
							error={error.genres.length > 0}
							helperText={error.genres}
						/>

						<AsyncComboBox
							value={tags}
							onChange={tagsHandler}
							label="Tags"
							loadFunction={tagsLoadFunction}
							error={error.tags.length > 0}
							helperText={error.tags}
						/>
					</Box>
					<Box sx={{ textAlign: "right" }}>
						<Button
							onClick={submitHandler}
							sx={{ mt: 2 }}
							variant="contained"
						>
							{buttonLabel}
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
};

export default BookmarkForm;
