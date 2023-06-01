import { Avatar, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import PersonIcon from "@mui/icons-material/Person";

const AccountButton = ({ onLogout }) => {
	const [anchor, setAnchor] = useState(null);
	const open = Boolean(anchor);
	const navigate = useNavigate();
	const ctx = useContext(AuthContext);

	const clickHandler = (event) => {
		setAnchor(event.currentTarget);
	};
	const closeHandler = () => {
		setAnchor(null);
	};

	async function logoutHandler() {
		try {
			const success = await logout();
			if (!success) {
				console.log("Something went wrong while logging out.");
				return;
			}

			ctx.setIsAuthenticated(false);
			navigate("/login");
		} catch (err) {
			console.log(err.message);
		} finally {
			closeHandler();
		}
	}
	return (
		<>
			<Avatar onClick={clickHandler}>
				<PersonIcon />
			</Avatar>
			<Menu
				anchorEl={anchor}
				open={open}
				onClose={closeHandler}
				MenuListProps={{
					"aria-labelledby": "account-button",
				}}
			>
				<MenuItem onClick={logoutHandler}>Logout</MenuItem>
			</Menu>
		</>
	);
};

export default AccountButton;
