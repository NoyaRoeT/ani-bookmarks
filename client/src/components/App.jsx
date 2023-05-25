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
import { AuthContext } from "../store/AuthContext";
import Test from "./Test";
import { BookmarkContext } from "../store/BookmarkContext";
import { fetchGenresAndTags } from "../services/bookmarks";

const App = () => {
	const ctx = useContext(AuthContext);
	const bookmarks = useContext(BookmarkContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function getGenresAndTags() {
			const res = await fetchGenresAndTags();
			bookmarks.setGenres(res.data.genres);
			bookmarks.setTags(res.data.tags);
		}
		async function isAuthenticated() {
			const authStatus = await checkAuth();
			ctx.setIsAuthenticated(authStatus);
			setIsLoading(false);
		}

		isAuthenticated();
		getGenresAndTags();
	}, []);

	return (
		<>
			<CssBaseline />
			{isLoading && <AppProgress />}
			{!isLoading && (
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
