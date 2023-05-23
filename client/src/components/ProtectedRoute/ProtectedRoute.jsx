import React, { useContext } from "react";
import { AuthContext } from "../../store/context";
import { Outlet, Navigate, useLocation } from "react-router-dom";

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
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
