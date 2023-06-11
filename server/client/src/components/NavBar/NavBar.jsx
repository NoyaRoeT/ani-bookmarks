import { AppBar, Toolbar, IconButton, useMediaQuery } from "@mui/material";

import Search from "./Search/Search";
import React from "react";

import { AccountButton } from "../";

const NavBar = () => {
	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Search
						sx={{
							flexGrow: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
					/>

					<IconButton size="large" color="inherit" aria-label="add">
						<AccountButton />
					</IconButton>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default NavBar;
