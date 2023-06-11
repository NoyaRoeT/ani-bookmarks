import React from "react";
import { Modal, CircularProgress } from "@mui/material";

const AppProgress = () => {
	return (
		<Modal open>
			<div
				style={{
					outline: 0,
					top: "50%",
					left: "50%",
					position: "absolute",
					transform: "translateX(-50%) translateY(-50%)",
				}}
			>
				<CircularProgress size={128} thickness={3} />
			</div>
		</Modal>
	);
};

export default AppProgress;
