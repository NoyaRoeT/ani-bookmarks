import React from "react";

import {
	Drawer,
	Box,
	AppBar,
	Toolbar,
	IconButton,
	useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const AppDrawer = () => {
	const theme = useTheme();
	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					display: { xs: "block", sm: "none" },
					bgcolor: theme.palette.background.default,
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
					>
						<MenuIcon />
					</IconButton>
					Responsive drawer
				</Toolbar>
			</AppBar>
			<Box component="nav" sx={{ width: { drawerWidth } }}>
				{/* Temporary drawer for mobile */}
				<Drawer
					variant="temporary"
					open={false}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				></Drawer>

				{/* Permanent drawer for larger screens */}
				<Drawer
					variant="permanent"
					open
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					Hello
				</Drawer>
			</Box>
		</>
	);
};

export default AppDrawer;
