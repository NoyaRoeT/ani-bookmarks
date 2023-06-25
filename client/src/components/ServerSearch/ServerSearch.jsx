import React, { useState, useRef } from "react";
import {
	Drawer,
	Typography,
	Box,
	IconButton,
	TextField,
	Select,
	FormControl,
	MenuItem,
	InputLabel,
	Autocomplete,
	Button,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AsyncComboBox from "../AsyncComboBox/AsyncComboBox";
import { getGenres, getTags } from "../../utils/bookmarks";

const ServerSearch = ({
	onClose,
	open,
	onSubmit,
	genreOptions,
	tagOptions,
	typeOptions,
}) => {
	const titleRef = useRef();
	const [type, setType] = useState("");
	const [genres, setGenres] = useState([]);
	const [tags, setTags] = useState([]);

	function typeChangeHandler(event) {
		setType(event.target.value);
	}

	async function genresLoadFunction() {
		try {
			const res = await getGenres();

			return res.data;
		} catch (err) {
			console.log(err.response.data);
			return [];
		}
	}

	async function tagsLoadFunction() {
		try {
			const res = await getTags();
			return res.data;
		} catch (err) {
			console.log(err.response.data);
			return [];
		}
	}

	function genresChangeHandler(event, value) {
		setGenres(value);
	}

	function tagsChangeHandler(event, value) {
		setTags(value);
	}

	function searchHandler() {
		const query = {
			title: titleRef.current.value,
			type,
			genres,
			tags,
		};
		onSubmit(query);
	}

	return (
		<Drawer
			onClose={onClose}
			anchor="right"
			open={open}
			sx={{
				"& .MuiDrawer-paper": {
					boxSizing: "border-box",
					width: { xs: "100%", sm: "400px" },
					padding: 3,
				},
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Typography sx={{ flexGrow: 1 }} variant="h6">
					Advanced Search
				</Typography>
				<IconButton onClick={onClose} sx={{ opacity: "0.6" }}>
					<CancelOutlinedIcon />
				</IconButton>
			</Box>

			<Box sx={{ mt: 2 }}>
				<TextField
					margin="normal"
					fullWidth
					label="Title"
					variant="outlined"
					inputRef={titleRef}
				/>

				<FormControl margin="normal" sx={{ minWidth: 120 }}>
					<InputLabel id="type-select-label">Type</InputLabel>
					<Select
						label="Type"
						labelId="type-select-label"
						value={type}
						onChange={typeChangeHandler}
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

				<AsyncComboBox
					value={genres}
					onChange={genresChangeHandler}
					label="Genres"
					loadFunction={genresLoadFunction}
				/>

				<AsyncComboBox
					value={tags}
					onChange={tagsChangeHandler}
					label="Tags"
					loadFunction={tagsLoadFunction}
				/>
			</Box>
			<Button
				onClick={searchHandler}
				sx={{ mt: 8, width: 1, p: 1 }}
				variant="contained"
			>
				Search
			</Button>
		</Drawer>
	);
};

export default ServerSearch;
