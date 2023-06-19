import React from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
	return (
		<TextField
			sx={{ maxWidth: "560px" }}
			fullWidth
			variant="standard"
			placeholder="Search the current list"
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				),
			}}
		/>
	);
};

export default SearchBar;
