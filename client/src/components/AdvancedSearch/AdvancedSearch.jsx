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
import { searchBookmarks } from "../../services/bookmarks";
import { useNavigate } from "react-router-dom";

const AdvancedSearch = ({ sx }) => {
	const bookmarks = useContext(BookmarkContext);
	const [type, setType] = useState("");
	const [genres, setGenres] = useState([]);
	const [tags, setTags] = useState([]);
	const titleRef = useRef();
	const [error, setError] = useState();
	const navigate = useNavigate();

	function typeChangeHandler(event) {
		setType(event.target.value);
	}

	function genresChangeHandler(value) {
		setGenres(value);
	}

	function tagsChangeHandler(value) {
		setTags(value);
	}

	async function submitHandler() {
		const query = {
			type,
			genres,
			tags,
			title: titleRef.current.value,
		};
		bookmarks.setFilter(query);
		navigate("/");
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
