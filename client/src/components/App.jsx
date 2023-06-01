import React, { useContext, useEffect, useState } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import {
	BookmarkInfo,
	Login,
	Bookmarks,
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
	console.log(bookmarks.tags);
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
					<Routes>
						<Route path="/" element={<ProtectedRoute />}>
							<Route path="" element={<Bookmarks />} />
							<Route path="test" element={<Test />} />
							<Route
								path="bookmark/:bookmarkId"
								element={<BookmarkInfo />}
							/>
						</Route>

						<Route
							path="/"
							element={<ProtectedRoute noAuth={true} />}
						>
							<Route path="login" element={<Login />} />
							<Route path="signup" element={<SignUp />} />
						</Route>

						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</>
			)}
		</>
	);
};
export default App;
