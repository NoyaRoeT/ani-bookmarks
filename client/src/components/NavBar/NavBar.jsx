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
	const [isLoading, setIsLoading] = useState(false);

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [mobileOpen, setMobileOpen] = useState(false);
	const [formOpen, setFormOpen] = useState(false);

	function handleDrawerToggle() {
		setMobileOpen((prev) => !prev);
	}

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

	const drawerWidth = "240px";

	const drawerItems = [
		{ text: "home", icon: "home" },
		{ text: "search", icon: "search" },
		{ text: ctx.isAuthenticated ? "logout" : "login", icon: "lock" },
	];

	const drawer = (
		<>
			{isLoading && <AppProgress />}
			<Toolbar />
			<Divider />
			<List>
				{drawerItems.map((item, index) => (
					<ListItem key={item.text} disablePadding>
						<ListItemButton
							onClick={
								item.text === "logout"
									? logoutHandler
									: () => {}
							}
						>
							<ListItemIcon>
								<Icon>{item.icon}</Icon>
							</ListItemIcon>
							<ListItemText
								sx={{
									textTransform: "uppercase",
								}}
								primary={item.text}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
		</>
	);

	return (
		<>
			<AppBar position="static">
				<Toolbar
					sx={{
						width: { sm: `calc(100% - ${drawerWidth})` },
						ml: { sm: `${drawerWidth}` },
					}}
				>
					{isMobile && (
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							onClick={handleDrawerToggle}
						>
							<MenuIcon />
						</IconButton>
					)}
					{ctx.isAuthenticated && (
						<Search
							sx={{
								flexGrow: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						/>
					)}
					{ctx.isAuthenticated && (
						<IconButton
							size="large"
							color="inherit"
							aria-label="add"
							sx={{ mr: 2 }}
							onClick={handleShowForm}
						>
							<AddIcon />
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<BookmarkForm
				label={"Add a bookmark"}
				open={formOpen}
				onClose={handleCloseForm}
				variant={"add"}
			/>
		</>
	);
};

export default NavBar;
