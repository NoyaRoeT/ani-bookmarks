import {
	AppBar,
	Toolbar,
	IconButton,
	Button,
	useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./Search/Search";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

const NavBar = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const location = useLocation();

	if (location.pathname === "/login") {
		return;
	}

	return (
		<AppBar position="static">
			<Toolbar>
				{isMobile && (
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
				)}
				<Search
					sx={{
						flexGrow: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				/>
				<Button color="inherit">Login</Button>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
