import React from "react";
import { Box, InputBase, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ sx }) => {
	const theme = useTheme();
	const styles = sx;
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
					inputProps={{ "aria-label": "Search bookmarks" }}
				/>
				<IconButton
					type="button"
					sx={{ p: "10px", color: "inherit" }}
					aria-label="search"
				>
					<SearchIcon />
				</IconButton>
			</Box>
		</Box>
	);
};

export default Search;
