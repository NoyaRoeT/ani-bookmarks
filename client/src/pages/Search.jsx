import React, { useEffect, useState, useContext } from "react";
import { IconButton, Toolbar, Box, Container, Typography } from "@mui/material";
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
import { AuthContext } from "../context/AuthContext";

const typeOptions = ["Anime", "Manga", "Manhwa", "Manhua", "Novel"];
const sortOptions = ["Last Added", "Rating"];
const Search = () => {
	const authContext = useContext(AuthContext);

	const [isFetching, setIsFetching] = useState(false);

	const [bookmarks, setBookmarks] = useState([]);
	const [filteredBookmarks, setFilteredBookmarks] = useState([]);
	const [showFilteredBookmarks, setShowFilteredBookmarks] = useState(false);

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
			setIsFetching(true);
			const res = await searchBookmarks(query);
			setBookmarks(res.data);
			setQuery(query);
			setShowFilteredBookmarks(false);
		} catch (err) {
			if (err.response && err.response.data.error.type == 0) {
				authContext.setUser(null);
			}
			console.log(err.response.data.error.message);
		} finally {
			setIsFetching(false);
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
		query.archived = false;
		try {
			setIsFetching(true);
			const res = await searchBookmarks(query);
			setBookmarks(res.data);
			setQuery(query);
			setShowFilteredBookmarks(false);
		} catch (err) {
			if (err.response && err.response.data.error.type == 0) {
				authContext.setUser(null);
			}
			console.log(err.response.data.error.message);
		} finally {
			setIsFetching(false);
		}
	}

	function localSearchHandler(res) {
		setFilteredBookmarks(
			bookmarks.filter((b) =>
				b.title.toLowerCase().includes(res.toLowerCase())
			)
		);
		setShowFilteredBookmarks(true);
	}

	useEffect(() => {
		(async () => {
			try {
				setIsFetching(true);
				const res = await searchBookmarks({
					title: "",
					type: "",
					genres: [],
					tags: [],
					sortBy: sortValue,
					archived: false,
				});
				setBookmarks(res.data);
			} catch (err) {
				if (err.response && err.response.data.error.type == 0) {
					authContext.setUser(null);
				}
				console.log(err.response.data.error.message);
			} finally {
				setIsFetching(false);
			}
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
			<BookmarkList
				isFetching={isFetching}
				bookmarks={
					showFilteredBookmarks ? filteredBookmarks : bookmarks
				}
			/>
		</Page>
	);
};

export default Search;
