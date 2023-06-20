import React from "react";
import {
	Box,
	Menu,
	Typography,
	ToggleButtonGroup,
	ToggleButton,
} from "@mui/material";

const SortMenu = ({ anchorEl, open, onClose, onChange, value, options }) => {
	return (
		<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={onClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			sx={{
				"& .MuiPaper-root": {
					mt: 1,
					p: 2,
				},
			}}
		>
			<Box sx={{ mb: 1 }}>
				<Typography variant="h6">Sort by</Typography>
			</Box>
			<ToggleButtonGroup
				color="primary"
				value={value}
				exclusive
				onChange={onChange}
			>
				{options.map((i) => (
					<ToggleButton value={i}>{i}</ToggleButton>
				))}
			</ToggleButtonGroup>
		</Menu>
	);
};

export default SortMenu;
