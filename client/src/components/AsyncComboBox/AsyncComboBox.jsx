import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

const AsyncComboBox = ({ value, onChange, label, loadFunction }) => {
	const [options, setOptions] = useState([]);
	const [open, setOpen] = useState(false);
	const loading = open && options.length === 0;

	useEffect(() => {
		if (!loading) {
			return;
		}

		(async () => {
			const res = await loadFunction();
			setOptions(res);
		})();
	}, [loading]);
	return (
		<Autocomplete
			value={value}
			onChange={onChange}
			multiple
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			disableClearable
			forcePopupIcon={false}
			loading={loading}
			options={options}
			renderInput={(params) => (
				<TextField
					{...params}
					margin="normal"
					variant="outlined"
					label={label}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? (
									<CircularProgress
										color="inherit"
										size={20}
									/>
								) : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
		/>
	);
};

export default AsyncComboBox;
