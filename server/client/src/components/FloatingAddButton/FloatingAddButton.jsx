import React, { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddBookmarkDialog } from "../";

const FloatingAddButton = ({ sx }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Fab
				sx={{ ...sx }}
				color="primary"
				aria-label="add"
				onClick={() => {
					setOpen(true);
				}}
			>
				<AddIcon />
			</Fab>

			<AddBookmarkDialog
				onClose={() => {
					setOpen(false);
				}}
				open={open}
			/>
		</>
	);
};

export default FloatingAddButton;
