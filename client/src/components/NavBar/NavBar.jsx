import {
	AppBar,
	Toolbar,
	IconButton,
	useMediaQuery,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Box,
	Drawer,
	Dialog,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Search from "./Search/Search";
import React, { useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../../store/AuthContext";
import { logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { AppProgress, BookmarkForm } from "../";

const NavBar = () => {
	const theme = useTheme();
	const ctx = useContext(AuthContext);
	const navigate = useNavigate();

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	function handleShowForm() {
		setFormOpen(true);
	}
	function handleCloseForm() {
		setFormOpen(false);
	}

	async function logoutHandler() {
		setIsLoading(true);
		ctx.setIsAuthenticated(!(await logout()));
		setIsLoading(false);
		navigate("/login");
	}

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

					<IconButton
						size="large"
						color="inherit"
						aria-label="add"
						sx={{ mr: 2 }}
						onClick={handleShowForm}
					>
						<AddIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default NavBar;
