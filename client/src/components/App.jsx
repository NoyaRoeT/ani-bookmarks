import React, { useContext, useEffect, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { BookmarkInfo, Login, Bookmarks, NavBar, SignUp, AppProgress } from ".";
import { checkAuth } from "../services/auth";
import { AuthContext } from "../store/context";
import Test from "./Test";

const App = () => {
	const navigate = useNavigate();
	const ctx = useContext(AuthContext);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	const [back, setBack] = useState(false);

	useEffect(() => {
		window.addEventListener("popstate", () => {
			setBack((prev) => !prev);
			setIsCheckingAuth(true);
		});
	}, [back]);

	useEffect(() => {
		async function isAuthenticated() {
			const authStatus = await checkAuth();
			ctx.setIsAuthenticated(authStatus);
			setIsCheckingAuth(false);
		}
		if (!isCheckingAuth && !ctx.isAuthenticated) {
			navigate("/login");
		} else {
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
							<Route exact path="/" element={<Bookmarks />} />
							{!ctx.isAuthenticated && (
								<Route
									exact
									path="/login"
									element={<Login />}
								/>
							)}
							{!ctx.isAuthenticated && (
								<Route
									exact
									path="/signup"
									element={<SignUp />}
								/>
							)}
							<Route exact path="/test" element={<Test />} />
							<Route
								exact
								path="/bookmark/:bookmarkId"
								element={<BookmarkInfo />}
							/>

							<Route
								path="*"
								element={<Navigate to="/" replace />}
							/>
						</Routes>
					</Box>
				</>
			)}
		</>
	);
};
export default App;
