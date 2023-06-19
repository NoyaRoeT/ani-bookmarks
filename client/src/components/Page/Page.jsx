import React from "react";
import { Box } from "@mui/material";

const Page = ({ children }) => {
	return (
		<Box sx={{ ml: { xs: 0, sm: "240px" }, mt: { xs: "64px", sm: 0 } }}>
			{children}
		</Box>
	);
};

export default Page;
