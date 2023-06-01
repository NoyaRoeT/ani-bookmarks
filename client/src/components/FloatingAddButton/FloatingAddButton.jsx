import React, { useState } from "react";
import { Fab, Dialog, DialogTitle, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BookmarkForm } from "../";

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
			{open && (
				<Dialog
					fullWidth
					open={open}
					maxWidth="md"
					onClose={() => {
						setOpen(false);
					}}
					sx={{ overflow: "visible" }}
				>
					<DialogTitle>Add a bookmark</DialogTitle>
					<DialogContent>
						<BookmarkForm
							variant={"add"}
							onAuthError={() => {
								setOpen(false);
							}}
							onSuccess={() => {
								setOpen(false);
							}}
						/>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};

export default FloatingAddButton;
