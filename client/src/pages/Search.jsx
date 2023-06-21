import React, { useState } from "react";
import { IconButton, Paper, Toolbar, Box, Menu } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import SortIcon from "@mui/icons-material/Sort";
import {
	BookmarkList,
	Page,
	SearchBar,
	ServerSearch,
	SortMenu,
} from "../components";

const bookmarks = [
	{
		title: "The Perfect Run",
		imagePath:
			"https://www.royalroadcdn.com/public/covers-full/36735-the-perfect-run.jpg?time=1604749383",
		type: "Novel",
		genres: ["Action", "Fantasy", "Martial Arts"],
		tags: [
			"Overpowered Protagonist",
			"Hiding True Identity",
			"Male Protagonist",
			"Beautiful Female Lead",
			"Comedic Protagonist",
		],
		rating: 4.5,
	},
	{
		title: "Martial King's Retired Life",
		imagePath:
			"https://www.royalroadcdn.com/public/covers-full/36735-the-perfect-run.jpg?time=1604749383",
		type: "Novel",
		genres: ["Action", "Fantasy", "Martial Arts"],
		tags: [
			"Overpowered Protagonist",
			"Hiding True Identity",
			"Male Protagonist",
			"Beautiful Female Lead",
			"Comedic Protagonist",
		],
		rating: 4.5,
	},
	{
		title: "Martial King's Retired Life",
		imagePath:
			"https://www.royalroadcdn.com/public/covers-full/36735-the-perfect-run.jpg?time=1604749383",
		type: "Novel",
		genres: ["Action", "Fantasy", "Martial Arts"],
		tags: [
			"Overpowered Protagonist",
			"Hiding True Identity",
			"Male Protagonist",
			"Beautiful Female Lead",
			"Comedic Protagonist",
		],
		rating: 4.5,
	},
	{
		title: "Martial King's Retired Life",

		type: "Novel",
		genres: ["Action", "Fantasy", "Martial Arts"],
		tags: [
			"Overpowered Protagonist",
			"Hiding True Identity",
			"Male Protagonist",
			"Beautiful Female Lead",
			"Comedic Protagonist",
		],
		rating: 4.5,
	},
];

const typeOptions = ["Type 1", "Loooooooooooooooooooooooong Type", "short"];
const genreOptions = ["Genre 1", "Looooooooooooooooooooooong Genre", "short"];
const sortOptions = ["Date Added", "Rating"];
const Search = () => {
	const [openServerSearch, setOpenServerSearch] = useState(false);

	const [menuAnchorEl, setMenuAnchorEl] = useState(null);
	const menuOpen = Boolean(menuAnchorEl);

	const [sortValue, setSortValue] = useState(sortOptions[0]);

	function sortChangeHandler(event, value) {
		setSortValue(value);
	}

	function openMenuHandler(event) {
		setMenuAnchorEl(event.currentTarget);
	}

	function closeMenuHandler(event) {
		setMenuAnchorEl(null);
	}

	function toggleServerSearchHandler() {
		setOpenServerSearch((prev) => !prev);
	}

	function serverSearchHandler(res) {
		console.log(res);
	}

	function localSearchHandler(res) {
		console.log(res);
	}

	return (
		<Page>
			<Paper>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							flexGrow: 1,
							display: "flex",
							justifyContent: "center",
						}}
					>
						<SearchBar onSubmit={localSearchHandler} />
					</Box>
					<Box sx={{ display: "flex" }}>
						<IconButton onClick={toggleServerSearchHandler}>
							<ManageSearchIcon />
						</IconButton>
						<IconButton onClick={openMenuHandler}>
							<SortIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</Paper>
			<ServerSearch
				open={openServerSearch}
				onClose={toggleServerSearchHandler}
				onSubmit={serverSearchHandler}
				genreOptions={genreOptions}
				tagOptions={genreOptions}
				typeOptions={typeOptions}
			/>
			<SortMenu
				anchorEl={menuAnchorEl}
				onClose={closeMenuHandler}
				open={menuOpen}
				options={sortOptions}
				value={sortValue}
				onChange={sortChangeHandler}
			/>
			<BookmarkList bookmarks={bookmarks} />
		</Page>
	);
};

export default Search;
