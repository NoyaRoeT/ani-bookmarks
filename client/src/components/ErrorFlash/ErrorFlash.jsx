import React from "react";
import { Alert, Snackbar } from "@mui/material";

const ErrorFlash = ({ open, sx, onClose, text }) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={5000}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			onClose={onClose}
			sx={{ ...sx }}
		>
			<Alert
				severity="error"
				variant="filled"
				sx={{ width: "100%" }}
				onClose={onClose}
			>
				{text}
			</Alert>
		</Snackbar>
	);
};

export default ErrorFlash;
