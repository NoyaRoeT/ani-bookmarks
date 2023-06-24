import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppDrawer } from "../";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ noAuth }) => {
	const location = useLocation();
	const { user } = useContext(AuthContext);

	if (noAuth) {
		return !user ? <Outlet /> : <Navigate to="/" />;
	}

	return user ? (
		<>
			<AppDrawer />
			<Outlet />;
		</>
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
