import React from "react";
import { CircularProgress, Modal, Box, Dialog } from "@mui/material";

const Test = () => {
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

export default Test;
