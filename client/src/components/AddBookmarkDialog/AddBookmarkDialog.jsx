import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { BookmarkForm } from "../";

const AddBookmarkDialog = () => {
	return (
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
	);
};

export default AddBookmarkDialog;
