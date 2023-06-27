import React, { useEffect, useState } from "react";
import { IconButton, Toolbar, Box } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import SortIcon from "@mui/icons-material/Sort";
import {
	BookmarkList,
	Page,
	SearchBar,
	ServerSearch,
	SortMenu,
} from "../components";
import { searchBookmarks } from "../utils/bookmarks";

const typeOptions = ["Anime", "Manga", "Manhwa", "Manhua", "Novel"];
const sortOptions = ["Last Added", "Rating"];
const Search = () => {
	const [bookmarks, setBookmarks] = useState([]);

	const [query, setQuery] = useState({});
	const [openServerSearch, setOpenServerSearch] = useState(false);

	const [menuAnchorEl, setMenuAnchorEl] = useState(null);
	const menuOpen = Boolean(menuAnchorEl);

	const [sortValue, setSortValue] = useState(sortOptions[0]);

	async function sortChangeHandler(event, value) {
		if (value === null) {
			return;
		}
		setSortValue(value);

		query.sortBy = value;
		try {
			const res = await searchBookmarks(query);
			setBookmarks(res.data);
			setQuery(query);
		} catch (err) {
			console.log(err.response.data);
		}
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

	async function serverSearchHandler(query) {
		query.sortBy = sortValue;
		try {
			const res = await searchBookmarks(query);
			setBookmarks(res.data);
			setQuery(query);
		} catch (err) {
			console.log(err.response.data);
		}
	}

	function localSearchHandler(res) {
		console.log(res);
	}

	useEffect(() => {
		(async () => {
			const res = await searchBookmarks({
				title: "",
				type: "",
				genres: [],
				tags: [],
				sortBy: sortValue,
			});
			setBookmarks(res.data);
		})();
	}, []);

	return (
		<Page>
			<Toolbar
				sx={{
					mt: 1,
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

			<ServerSearch
				open={openServerSearch}
				onClose={toggleServerSearchHandler}
				onSubmit={serverSearchHandler}
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
