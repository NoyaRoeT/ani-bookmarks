import React, { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSubmit }) => {
	const [value, setValue] = useState("");

	function valueChangeHandler(event) {
		setValue(event.target.value);
	}

	function keyDownHandler(event) {
		if (event.key === "Enter") {
			onSubmit(value);
		}
	}
	return (
		<TextField
			onKeyDown={keyDownHandler}
			value={value}
			onChange={valueChangeHandler}
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
