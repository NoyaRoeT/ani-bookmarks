import React, { useState } from "react";
import { Autocomplete, TextField, useTheme } from "@mui/material";

const options = ["Fantasy", "Action", "Sci-Fi"];

const ComboBox = ({ id, label, sx, onChange }) => {
	const [chosen, setChosen] = useState([]);

	function handleChange(event, value) {
		setChosen(value);
		if (onChange) {
			onChange(value);
		}
	}

	return (
		<Autocomplete
			disablePortal
			disableClearable
			multiple
			value={chosen}
			onChange={handleChange}
			popupIcon={false}
			options={options}
			getOptionDisabled={(option) => {
				return chosen.some((item) => item === option);
			}}
			renderInput={(params) => (
				<TextField
					margin="normal"
					{...params}
					variant="outlined"
					{...params}
					id={id}
					label={label}
				/>
			)}
		/>
	);
};

export default ComboBox;
