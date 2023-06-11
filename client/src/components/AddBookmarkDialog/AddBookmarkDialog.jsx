import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { BookmarkForm } from "../";

const AddBookmarkDialog = ({ open, onClose }) => {
	return (
		<Dialog
			fullWidth
			open={open}
			maxWidth="md"
			onClose={onClose}
			sx={{ overflow: "visible" }}
		>
			<DialogTitle>Add a bookmark</DialogTitle>
			<DialogContent>
				<BookmarkForm
					variant={"add"}
					onAuthError={onClose}
					onSuccess={onClose}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default AddBookmarkDialog;
