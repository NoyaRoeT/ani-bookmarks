import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Box,
	Button,
	Typography,
	Container,
	useTheme,
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../Logo/Logo";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../utils/auth";
import ErrorFlash from "../ErrorFlash/ErrorFlash";

const AccountMenu = ({ username }) => {
	const auth = useContext(AuthContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const [error, setError] = useState("");
	const isErrorOpen = Boolean(error);

	async function handleLogout() {
		try {
			await logout();
			auth.setUser(null);
		} catch (err) {
			setError("Failed to logout.");
		}
	}

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<ErrorFlash
				open={isErrorOpen}
				onClose={() => setError("")}
				text={error}
			/>
			<IconButton onClick={handleClick}>
				<Typography variant="h6" fontSize="1rem" color="gray">
					Hello, {username}!
				</Typography>
				<ArrowDropDownIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				onClose={handleClose}
				open={open}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<Box sx={{ display: { md: "none" } }}>
					<MenuItem
						component={Link}
						to="/search"
						onClick={handleClose}
					>
						<ListItemIcon>
							<SearchIcon />
						</ListItemIcon>
						<ListItemText>Search</ListItemText>
					</MenuItem>
					<MenuItem component={Link} to="/new" onClick={handleClose}>
						<ListItemIcon>
							<BookmarkAddIcon />
						</ListItemIcon>
						<ListItemText>Add</ListItemText>
					</MenuItem>
					<MenuItem
						component={Link}
						to="/bookmarks/favorite"
						onClick={handleClose}
					>
						<ListItemIcon>
							<FavoriteIcon />
						</ListItemIcon>
						<ListItemText>Favorite</ListItemText>
					</MenuItem>
					<MenuItem
						component={Link}
						to="/bookmarks/archive"
						onClick={handleClose}
					>
						<ListItemIcon>
							<ArchiveIcon />
						</ListItemIcon>
						<ListItemText>Archive</ListItemText>
					</MenuItem>
					<Divider />
				</Box>
				<MenuItem
					onClick={() => {
						handleClose();
						handleLogout();
					}}
				>
					<ListItemIcon>
						<LogoutIcon />
					</ListItemIcon>
					<ListItemText>Logout</ListItemText>
				</MenuItem>
			</Menu>
		</Box>
	);
};

const NavBar = () => {
	const theme = useTheme();
	const auth = useContext(AuthContext);

	return (
		<AppBar
			position="static"
			elevation={0}
			sx={{
				backgroundColor: "inherit",
				color: "inherit",
			}}
		>
			<Container
				maxWidth="lg"
				disableGutters
				sx={{
					backgroundColor: theme.palette.background.paper,
				}}
			>
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						borderBottom: "1px solid #e7e7e7",
					}}
				>
					<Box sx={{ display: "flex" }}>
						<IconButton component={Link} to="/home">
							<Logo
								sx={{ display: "flex", alignItems: "center" }}
							/>
						</IconButton>
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							<Button
								component={Link}
								to="/search"
								sx={{ color: "grey", mx: "4px" }}
								startIcon={<SearchIcon />}
							>
								<Typography variant="h6" fontSize="1rem">
									Search
								</Typography>
							</Button>
							<Button
								component={Link}
								to="/new"
								sx={{ color: "grey", mx: "4px" }}
								startIcon={<BookmarkAddIcon />}
							>
								<Typography variant="h6" fontSize="1rem">
									Add
								</Typography>
							</Button>
							<Button
								component={Link}
								to="/bookmarks/favorite"
								sx={{ color: "grey", mx: "4px" }}
								startIcon={<FavoriteIcon />}
							>
								<Typography variant="h6" fontSize="1rem">
									Favorite
								</Typography>
							</Button>
							<Button
								component={Link}
								to="/bookmarks/archive"
								sx={{ color: "grey", mx: "4px" }}
								startIcon={<ArchiveIcon />}
							>
								<Typography variant="h6" fontSize="1rem">
									Archived
								</Typography>
							</Button>
						</Box>
					</Box>
					<Box sx={{ display: "flex" }}>
						{auth.user && (
							<AccountMenu username={auth.user.username} />
						)}
						{!auth.user && (
							<Button
								sx={{ borderRadius: "20% / 50%" }}
								variant="contained"
							>
								SIGN IN
							</Button>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default NavBar;
