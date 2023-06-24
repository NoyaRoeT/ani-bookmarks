import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../../assets/logo.jpg";

const Logo = ({ sx }) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center", ...sx }}>
			<img src={logo} width={"48px"} />
			<Typography
				variant="h1"
				fontSize="1.25rem"
				lineHeight="1.75rem"
				fontWeight={600}
			>
				Storybook
			</Typography>
		</Box>
	);
};

export default Logo;
