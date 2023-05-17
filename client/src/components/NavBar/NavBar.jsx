import {
	AppBar,
	Toolbar,
	IconButton,
	Button,
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
import Search from "./Search/Search";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

const NavBar = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [mobileOpen, setMobileOpen] = useState(false);

	function handleDrawerToggle() {
		setMobileOpen((prev) => !prev);
	}

	const drawerWidth = "240px";

	const drawer = (
		<>
			<Toolbar />
			<Divider />
			<List>
				{[
					{ text: "home", icon: "home" },
					{ text: "search", icon: "search" },
					{ text: "login", icon: "lock" },
				].map((item, index) => (
					<ListItem key={item.text} disablePadding>
						<ListItemButton>
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
					<Search
						sx={{
							flexGrow: 1,
							justifyContent: "center",
							alignItems: "center",
						}}
					/>
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
		</>
	);
};

export default NavBar;
