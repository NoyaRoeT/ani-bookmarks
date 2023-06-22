import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Button,
} from "@mui/material";

const DeleteDialog = ({ open, onClose, onDelete }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				Delete this bookmark?
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					This action cannot be undone. The bookmark will be deleted
					permanently.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={onClose}>
					Cancel
				</Button>
				<Button
					color="error"
					variant="contained"
					onClick={onDelete}
					autoFocus
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteDialog;
