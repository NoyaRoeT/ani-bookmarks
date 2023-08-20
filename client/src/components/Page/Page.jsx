import React from "react";
import { Container, useTheme } from "@mui/material";
import NavBar from "../NavBar/NavBar";

const Page = ({ children }) => {
	const theme = useTheme();

	return (
		<Container
			maxWidth="lg"
			sx={{
				backgroundColor: theme.palette.background.paper,
				boxShadow: theme.shadows[1],
			}}
			disableGutters
		>
			<NavBar />
			<Container maxWidth="lg" sx={{ pt: 2 }}>
				{children}
			</Container>
		</Container>
	);
};

export default Page;
