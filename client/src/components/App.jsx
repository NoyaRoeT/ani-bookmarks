import React, { useContext, useEffect, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import {
	BookmarkInfo,
	Login,
	Bookmarks,
	NavBar,
	SignUp,
	AppProgress,
	ProtectedRoute,
} from ".";
import { checkAuth } from "../services/auth";
import { AuthContext } from "../store/context";
import Test from "./Test";

const App = () => {
	const ctx = useContext(AuthContext);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	useEffect(() => {
		async function isAuthenticated() {
			const authStatus = await checkAuth();
			ctx.setIsAuthenticated(authStatus);
			setIsCheckingAuth(false);
		}
		if (!ctx.isAuthenticated && isCheckingAuth) {
			isAuthenticated();
		}
	}, [isCheckingAuth]);

	return (
		<>
			<CssBaseline />
			{isCheckingAuth && <AppProgress />}
			{!isCheckingAuth && (
				<>
					<NavBar />
					<Box
						component="main"
						sx={{
							ml: { sm: "240px" },
							width: { sm: `calc(100% - 240px)` },
						}}
					>
						<Routes>
							<Route path="/" element={<ProtectedRoute />}>
								<Route path="" element={<Bookmarks />} />
							</Route>

							<Route
								path="/login"
								element={<ProtectedRoute noAuth={true} />}
							>
								<Route path="" element={<Login />} />
							</Route>

							<Route
								path="/signup"
								element={<ProtectedRoute noAuth={true} />}
							>
								<Route path="" element={<SignUp />} />
							</Route>

							<Route path="/test" element={<ProtectedRoute />}>
								<Route path="" element={<Test />} />
							</Route>

							<Route
								path="/bookmark/"
								element={<ProtectedRoute />}
							>
								<Route
									path=":bookmarkId"
									element={<BookmarkInfo />}
								/>
							</Route>
						</Routes>
					</Box>
				</>
			)}
		</>
	);
};
export default App;
