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
	const [tags, setTags] = useState();

	function typeChangeHandler(event) {
		setType(event.target.value);
	}

	function genresChangeHandler(event, value) {
		setGenres(value);
	}

	function tagsChangeHandler(event, value) {
		setTags(value);
	}

	function searchHandler() {
		const placeholders = ["A", "B", "C"];
		onSubmit(placeholders);
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

				<Autocomplete
					value={genres}
					onChange={genresChangeHandler}
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
						/>
					)}
				/>

				<Autocomplete
					value={tags}
					onChange={tagsChangeHandler}
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
