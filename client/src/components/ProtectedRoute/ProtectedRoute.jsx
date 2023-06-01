import React, { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { Box } from "@mui/material";

const ProtectedRoute = ({ noAuth }) => {
	const ctx = useContext(AuthContext);
	const location = useLocation();

	if (noAuth) {
		return !ctx.isAuthenticated ? (
			<Outlet />
		) : (
			<Navigate to="/" state={{ from: location }} replace />
		);
	}

	return ctx.isAuthenticated ? (
		<>
			<NavBar />
			<Outlet />
		</>
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
