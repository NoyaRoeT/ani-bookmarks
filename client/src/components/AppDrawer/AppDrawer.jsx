import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
	Drawer,
	Box,
	AppBar,
	Toolbar,
	IconButton,
	useTheme,
	Typography,
	Avatar,
	List,
	ListSubheader,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

import { Logo } from "../";
import { logout } from "../../utils/auth";
import { AuthContext } from "../../context/AuthContext";

const drawerWidth = 240;

const ListIcon = ({ children }) => {
	return <ListItemIcon sx={{ minWidth: "40px" }}>{children}</ListItemIcon>;
};
const DrawerContent = () => {
	const authContext = useContext(AuthContext);

	async function logoutHandler() {
		try {
			await logout();
			authContext.setUser(null);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<Box
			sx={{
				mx: 1,
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<Logo sx={{ my: 1 }} />
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					width: 1,
					my: 3,
				}}
			>
				<Avatar sx={{ mb: 1 }} alt="avatar">
					N
				</Avatar>
				<Typography variant="h6">Username</Typography>
			</Box>

			<List
				sx={{ mb: 3 }}
				subheader={
					<ListSubheader>
						<Typography variant="subtitle2">BOOKMARKS</Typography>
					</ListSubheader>
				}
			>
				<ListItemButton component={Link} to="/home">
					<ListIcon>
						<BookmarksIcon />
					</ListIcon>
					<ListItemText primary="Home" />
				</ListItemButton>

				<ListItemButton component={Link} to="/search">
					<ListIcon>
						<SearchIcon />
					</ListIcon>
					<ListItemText primary="Search" />
				</ListItemButton>

				<ListItemButton component={Link} to="/favorite">
					<ListIcon>
						<FavoriteIcon />
					</ListIcon>
					<ListItemText primary="Favorite" />
				</ListItemButton>
				<ListItemButton component={Link} to="/archive">
					<ListIcon>
						<ArchiveIcon />
					</ListIcon>
					<ListItemText primary="Archive" />
				</ListItemButton>
				<ListItemButton component={Link} to="/new">
					<ListIcon>
						<BookmarkAddIcon />
					</ListIcon>
					<ListItemText primary="Add Bookmark" />
				</ListItemButton>
			</List>
			<List
				sx={{ mb: 3, flexGrow: 1 }}
				subheader={
					<ListSubheader>
						<Typography variant="subtitle2">
							USEFUL LINKS
						</Typography>
					</ListSubheader>
				}
			>
				<ListItemButton>
					<ListIcon>
						<img
							width="24px"
							height="24px"
							src="https://myanimelist.net/favicon.ico"
						></img>
					</ListIcon>
					<ListItemText primary="MyAnimeList" />
				</ListItemButton>
				<ListItemButton>
					<ListIcon>
						<img
							width="24px"
							height="24px"
							src="https://forum.novelupdates.com/favicon.ico"
						/>
					</ListIcon>
					<ListItemText primary="NovelUpdates" />
				</ListItemButton>
				<ListItemButton>
					<ListIcon>
						<img
							width="24px"
							height="24px"
							src="https://webtoons-static.pstatic.net/image/favicon/favicon.ico?dt=2017082301"
						/>
					</ListIcon>
					<ListItemText primary="WebToons" />
				</ListItemButton>
			</List>
			<Button
				variant="outlined"
				sx={{
					display: "flex",
					justifyContent: "center",
					width: 1,

					py: "12px",
					mb: 3,
				}}
				onClick={logoutHandler}
			>
				<LogoutIcon sx={{ mr: 1 }} />
				<Typography>Logout</Typography>
			</Button>
		</Box>
	);
};

const AppDrawer = () => {
	const theme = useTheme();

	const [isOpen, setIsOpen] = useState(false);

	function handleDrawerToggle() {
		setIsOpen((prev) => !prev);
	}

	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					display: { xs: "block", sm: "none" },
					bgcolor: theme.palette.background.default,
					color: theme.palette.text.secondary,
				}}
			>
				<Toolbar>
					<IconButton
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box component="nav" sx={{ width: { drawerWidth } }}>
				{/* Temporary drawer for mobile */}
				<Drawer
					variant="temporary"
					open={isOpen}
					onClose={handleDrawerToggle}
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
				>
					<DrawerContent />
				</Drawer>

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
					<DrawerContent />
				</Drawer>
			</Box>
		</>
	);
};

export default AppDrawer;
