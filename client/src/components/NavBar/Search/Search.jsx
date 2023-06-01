import React, { useRef, useState, useContext } from "react";
import {
	Box,
	InputBase,
	IconButton,
	Dialog,
	DialogContent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import { AdvancedSearch } from "../../";
import { BookmarkContext } from "../../../store/BookmarkContext";

const Search = ({ sx }) => {
	const theme = useTheme();
	const styles = sx;

	const [openAdvanced, setOpenAdvanced] = useState(false);
	const searchRef = useRef();
	const bookmarkContext = useContext(BookmarkContext);

	function searchHandler() {
		const query = {
			title: searchRef.current.value,
		};
		bookmarkContext.setFilter(query);
	}

	function enterHandler(event) {
		if (event.key === "Enter") {
			searchHandler();
		}
	}

	return (
		<Box sx={{ ...styles, display: "flex" }}>
			<Box
				sx={{
					borderRadius: theme.shape.borderRadius,
					bgcolor: theme.palette.primary.dark,
					display: "flex",
					maxWidth: "700px",
					flexGrow: 1,
					pl: theme.spacing(2),
					pr: theme.spacing(1),
				}}
			>
				<InputBase
					sx={{
						ml: 1,
						color: "inherit",
						flexGrow: 1,
					}}
					placeholder="Simple Search..."
					inputProps={{
						"aria-label": "Search bookmarks",
						onKeyDown: enterHandler,
					}}
					inputRef={searchRef}
				/>
				<IconButton
					type="button"
					sx={{ p: "10px", color: "inherit" }}
					aria-label="search"
					onClick={searchHandler}
				>
					<SearchIcon />
				</IconButton>
				<IconButton
					sx={{ color: "inherit" }}
					onClick={() => {
						setOpenAdvanced(true);
					}}
				>
					<ListIcon />
				</IconButton>
			</Box>
			<Dialog open={openAdvanced} onClose={() => setOpenAdvanced(false)}>
				<DialogContent>
					<AdvancedSearch />
				</DialogContent>
			</Dialog>
		</Box>
	);
};

export default Search;
