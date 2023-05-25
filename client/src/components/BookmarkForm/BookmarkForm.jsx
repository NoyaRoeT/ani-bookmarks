import React, { useState, useRef, useContext } from "react";
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
	Select,
	MenuItem,
	InputLabel,
	CircularProgress,
	Alert,
} from "@mui/material";
import { ComboBox } from "../";
import { addBookmark, editBookmark } from "../../services/bookmarks";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import { BookmarkContext } from "../../store/BookmarkContext";

const BookmarkForm = ({ bookmark, onAuthError, onSuccess, variant }) => {
	const [error, setError] = useState(null);
	const [imageUrl, setImageUrl] = useState(
		bookmark && bookmark.imagePath ? bookmark.imagePath : null
	);
	const [genres, setGenres] = useState(
		bookmark ? bookmark.genres.map((g) => g.name) : []
	);
	const [tags, setTags] = useState(
		bookmark ? bookmark.tags.map((t) => t.name) : []
	);
	const [type, setType] = useState(bookmark ? bookmark.type : 0);
	const imageRef = useRef();
	const titleRef = useRef();

	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const ctx = useContext(AuthContext);
	const bookmarks = useContext(BookmarkContext);

	async function handleSuccess() {
		await bookmarks.getBookmarks();
		onSuccess();
	}

	async function submitHandler() {
		const data = {
			title: titleRef.current.value,
			image: imageRef.current.files[0],
			genres,
			tags,
			type,
		};
		let result;
		try {
			setIsLoading(true);
			if (variant === "edit") {
				data.id = bookmark._id;
				result = await editBookmark(data);
			} else {
				result = await addBookmark(data);
			}

			if (!result.error) {
				error && setError(null);
				imageUrl && URL.revokeObjectURL(imageUrl);
				setImageUrl("");
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

	function imageChangeHandler(event) {
		const file = event.target.files[0];
		if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
			return;
		}
		imageUrl && URL.revokeObjectURL(imageUrl);
		setImageUrl(URL.createObjectURL(file));
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
									ref={imageRef}
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
							inputRef={titleRef}
							defaultValue={bookmark ? bookmark.title : null}
						/>
						<FormControl margin="normal">
							<InputLabel id="type">Type</InputLabel>
							<Select
								labelId="type"
								id="type"
								value={type}
								label="Type"
								onChange={typeChangeHandler}
							>
								<MenuItem value={0}>Anime</MenuItem>
								<MenuItem value={1}>Manga</MenuItem>
								<MenuItem value={2}>Manhwa</MenuItem>
								<MenuItem value={3}>Manhua</MenuItem>
								<MenuItem value={4}>Novel</MenuItem>
							</Select>
						</FormControl>
						<ComboBox
							onChange={genresChangeHandler}
							options={bookmarks.genres}
							value={genres}
							label={"Genre"}
						/>
						<ComboBox
							onChange={tagsChangeHandler}
							options={bookmarks.tags}
							label={"Tags"}
							value={tags}
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
