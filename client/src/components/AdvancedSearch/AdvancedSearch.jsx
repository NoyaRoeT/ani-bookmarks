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

const AdvancedSearch = () => {
	const bookmarks = useContext(BookmarkContext);
	const [type, setType] = useState(0);
	const [genres, setGenres] = useState([]);
	const [tags, setTags] = useState([]);
	const titleRef = useRef();

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
		try {
			bookmarks.setIsLoading(true);
			const res = await searchBookmarks(query);

			console.log(res);
		} catch (err) {
			console.log(err);
		} finally {
			bookmarks.setIsLoading(false);
		}
	}

	return (
		<Paper>
			<TextField
				margin="normal"
				fullWidth
				id="title"
				label="Title"
				name="title"
				autoFocus
				inputRef={titleRef}
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
		</Paper>
	);
};

export default AdvancedSearch;
