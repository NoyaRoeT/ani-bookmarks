import React from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { BookmarkInfo, Login, Bookmarks, NavBar } from ".";
const App = () => {
	return (
		<>
			<CssBaseline />
			<NavBar />
			<main>
				<Routes>
					<Route exact path="/" element={<Bookmarks />} />
					<Route exact path="/login" element={<Login />} />
					<Route
						exact
						path="/bookmark/:bookmarkId"
						element={<BookmarkInfo />}
					/>
				</Routes>
			</main>
		</>
	);
};
export default App;
