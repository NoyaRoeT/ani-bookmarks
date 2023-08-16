import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppDrawer } from "../";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ noAuth }) => {
	const location = useLocation();
	// from is used to handle the case where a user is redirected from a protected page before auth check is completed
	const { from } = location.state || { from: { pathname: "/home" } };
	const { user } = useContext(AuthContext);

	if (noAuth) {
		return !user ? (
			<Outlet />
		) : (
			<Navigate to={from.pathname === "/" ? "/home" : from.pathname} />
		);
	}

	return user ? (
		<>
			<AppDrawer />
			<Outlet />;
		</>
	) : (
		<Navigate
			to="/login"
			state={{
				from:
					location.pathname === "/"
						? { pathname: "/home" }
						: location,
			}}
			replace
		/>
	);
};

export default ProtectedRoute;
