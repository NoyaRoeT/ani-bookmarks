import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../../assets/logo.jpg";

const Logo = ({ sx }) => {
	return (
		<Box sx={{ ...sx }}>
			<img src="/logo.png" width="140px" />
		</Box>
	);
};

export default Logo;
