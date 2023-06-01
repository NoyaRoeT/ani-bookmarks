import {
	Paper,
	FormControl,
	MenuItem,
	Button,
	TextField,
	InputLabel,
	Select,
	Box,
} from "@mui/material";
import ComboBox from "../ComboBox/ComboBox";
import React, { useContext, useRef, useState } from "react";
import { BookmarkContext } from "../../store/BookmarkContext";

const AdvancedSearch = ({ sx }) => {
	const bookmarks = useContext(BookmarkContext);

	const [type, setType] = useState(
		bookmarks.filter.type ? bookmarks.filter.type : ""
	);
	const [genres, setGenres] = useState(
		bookmarks.filter.genres ? bookmarks.filter.genres : []
	);
	const [tags, setTags] = useState(
		bookmarks.filter.tags ? bookmarks.filter.tags : []
	);
	const titleRef = useRef();
	const [error, setError] = useState();

	function typeChangeHandler(event) {
		setType(event.target.value);
	}

	function genresChangeHandler(value) {
		setGenres(value);
	}

	function tagsChangeHandler(value) {
		setTags(value);
	}

	function submitHandler() {
		const query = {
			type,
			genres,
			tags,
			title: titleRef.current.value,
		};
		bookmarks.setFilter(query);
	}

	return (
		<Box sx={{ ...sx }}>
			{error && <Alert severity="error">{error}</Alert>}
			<TextField
				margin="normal"
				fullWidth
				id="title"
				label="Title"
				name="title"
				autoFocus
				inputRef={titleRef}
			/>
			<FormControl margin="normal" sx={{ minWidth: "110px" }}>
				<InputLabel id="type">Type</InputLabel>
				<Select
					required
					labelId="type"
					id="type"
					value={type}
					label="Type"
					onChange={typeChangeHandler}
				>
					<MenuItem value="">None</MenuItem>
					<MenuItem value={"anime"}>Anime</MenuItem>
					<MenuItem value={"manga"}>Manga</MenuItem>
					<MenuItem value={"manhwa"}>Manhwa</MenuItem>
					<MenuItem value={"manhua"}>Manhua</MenuItem>
					<MenuItem value={"novel"}>Novel</MenuItem>
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
					display: "flex",
					justifyContent: "flex-end",
				}}
			>
				<Button
					variant="contained"
					sx={{ px: 2 }}
					onClick={submitHandler}
				>
					Confirm
				</Button>
			</Box>
		</Box>
	);
};

export default AdvancedSearch;
