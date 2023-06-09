import React, { useState, useRef, useContext, useEffect } from "react";
import {
	Box,
	Divider,
	Button,
	FormControl,
	TextField,
	Grid,
	Select,
	MenuItem,
	InputLabel,
	CircularProgress,
	Alert,
	Typography,
	IconButton,
	Rating,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { ComboBox } from "../";
import { addBookmark, editBookmark } from "../../services/bookmarks";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import { BookmarkContext } from "../../store/BookmarkContext";
import { validateBookmark } from "../../utils/bookmark";

const BookmarkForm = ({ bookmark, onAuthError, onSuccess, variant }) => {
	const [rating, setRating] = useState(bookmark ? bookmark.rating : 0);

	const [genres, setGenres] = useState(
		bookmark ? bookmark.genres.map((g) => g.name) : []
	);
	const [genresError, setGenresError] = useState();

	const [tags, setTags] = useState(
		bookmark ? bookmark.tags.map((t) => t.name) : []
	);

	const [type, setType] = useState(bookmark ? bookmark.type : "");
	const [typeError, setTypeError] = useState();

	const titleRef = useRef();
	const [titleError, setTitleError] = useState();

	const imageRef = useRef();
	const imageUrlRef = useRef();
	const [imageUrl, setImageUrl] = useState(
		bookmark && bookmark.imagePath ? bookmark.imagePath : ""
	);
	const [previewUrl, setPreviewUrl] = useState(
		bookmark && bookmark.imagePath ? bookmark.imagePath : null
	);

	const [showUrlField, setShowUrlField] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [useUrl, setUseUrl] = useState();

	const navigate = useNavigate();
	const ctx = useContext(AuthContext);
	const bookmarks = useContext(BookmarkContext);

	useEffect(() => {
		const handler = setTimeout(() => {
			setPreviewUrl(imageUrl);
		}, 500);
		return () => {
			clearTimeout(handler);
		};
	}, [imageUrl]);

	async function handleSuccess() {
		await bookmarks.getBookmarks();
		onSuccess();
	}

	async function submitHandler() {
		const data = {
			title: titleRef.current.value,
			genres,
			tags,
			type,
			rating,
		};

		// Use either uploaded image or image url, but not both
		if (useUrl) {
			data.imageUrl = imageUrlRef.current.value;
		} else if (imageRef.current.files[0]) {
			data.image = imageRef.current.files[0];
		}

		// Validate fields
		const invalidField = validateBookmark(data);
		const fieldsToSetters = {
			title: setTitleError,
			genres: setGenresError,
			type: setTypeError,
		};

		if (invalidField) {
			for (const field in fieldsToSetters) {
				if (invalidField.field === field) {
					fieldsToSetters[field](true);
				} else {
					fieldsToSetters[field](false);
				}
			}

			setError(invalidField.message);
			return;
		} else {
			for (const field in fieldsToSetters) {
				fieldsToSetters[field](false);
			}
			error && setError(null);
		}

		// Post to server
		let result;
		try {
			setIsLoading(true);
			if (variant === "edit") {
				result = await editBookmark(data, bookmark._id);
			} else {
				result = await addBookmark(data);
			}

			if (!result.error) {
				error && setError(null);
				previewUrl && URL.revokeObjectURL(previewUrl);
				setPreviewUrl(null);
				await handleSuccess();
				navigate("/");
			} else if (result.error.type === 0) {
				error && setError(null);
				ctx.setIsAuthenticated(false);
				onAuthError();
			} else {
				setError(result.error.message);
			}
		} catch (err) {
			console.error(err);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}
	function typeChangeHandler(event) {
		setType(event.target.value);
	}

	function genresChangeHandler(value) {
		setGenres(value);
	}

	function tagsChangeHandler(value) {
		setTags(value);
	}

	function ratingChangeHandler(event) {
		console.log(event.target.value);
		setRating(Number(event.target.value));
	}

	function imageUploadHandler(event) {
		const file = event.target.files[0];
		if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
			previewUrl && URL.revokeObjectURL(previewUrl);
			previewUrl && setPreviewUrl(undefined);
			return;
		}
		previewUrl && URL.revokeObjectURL(previewUrl);
		setPreviewUrl(URL.createObjectURL(file));
		setUseUrl(false);
	}

	function imageUrlHandler(event) {
		setImageUrl(event.target.value);
		setUseUrl(true);
	}

	return (
		<>
			{error && <Alert severity="error">{error}</Alert>}
			<Grid container>
				<Grid item xs={12} md={3}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Rating
							size="large"
							precision={0.5}
							onChange={ratingChangeHandler}
							value={rating}
						/>
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
									previewUrl
										? previewUrl
										: "https://via.placeholder.com/400"
								}
							/>
						</Box>
						<FormControl>
							<Button
								sx={{
									display: showUrlField
										? "none"
										: "inline-flex",
								}}
								variant="contained"
								component="label"
							>
								Upload Image
								<input
									type="file"
									accept="image/*"
									hidden
									onChange={imageUploadHandler}
									ref={imageRef}
								/>
							</Button>
							{!showUrlField && (
								<Typography textAlign={"center"}>or</Typography>
							)}
							{!showUrlField && (
								<Button
									type="button"
									variant="contained"
									onClick={() => setShowUrlField(true)}
								>
									Enter Image Url
								</Button>
							)}
							<Box
								display={!showUrlField ? "none" : "flex"}
								justifyContent="center"
							>
								<TextField
									label="Image Url"
									value={imageUrl}
									onChange={imageUrlHandler}
									inputRef={imageUrlRef}
								/>
								<IconButton
									onClick={() => {
										setShowUrlField(false);
									}}
								>
									<CancelIcon />
								</IconButton>
							</Box>
						</FormControl>
					</Box>
				</Grid>

				<Grid item xs={12} md={9} sx={{ pl: "24px" }}>
					<Box sx={{ py: "24px", px: "12px" }}>
						<TextField
							margin="normal"
							error={titleError}
							required
							fullWidth
							id="title"
							label="Title"
							name="title"
							autoFocus
							inputRef={titleRef}
							defaultValue={bookmark ? bookmark.title : null}
						/>
						<FormControl margin="normal" sx={{ minWidth: "110px" }}>
							<InputLabel id="type">Type</InputLabel>
							<Select
								error={typeError}
								required
								labelId="type"
								id="type"
								value={type}
								label="Type"
								onChange={typeChangeHandler}
							>
								<MenuItem value={"anime"}>Anime</MenuItem>
								<MenuItem value={"manga"}>Manga</MenuItem>
								<MenuItem value={"manhwa"}>Manhwa</MenuItem>
								<MenuItem value={"manhua"}>Manhua</MenuItem>
								<MenuItem value={"novel"}>Novel</MenuItem>
							</Select>
						</FormControl>
						<ComboBox
							error={genresError}
							onChange={genresChangeHandler}
							options={bookmarks.genres}
							value={genres}
							label={"Genre"}
							required
						/>
						<ComboBox
							onChange={tagsChangeHandler}
							options={bookmarks.tags}
							label={"Tags"}
							value={tags}
							required
						/>
						<Box
							sx={{
								position: "relative",
								mt: 2,
								float: "right",
							}}
						>
							<Button
								variant="contained"
								sx={{ px: 2 }}
								onClick={submitHandler}
								disabled={isLoading}
							>
								Confirm
							</Button>
							{isLoading && (
								<CircularProgress
									size={24}
									sx={{
										position: "absolute",
										top: "50%",
										left: "50%",
										marginTop: "-12px",
										marginLeft: "-12px",
									}}
								/>
							)}
						</Box>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default BookmarkForm;
