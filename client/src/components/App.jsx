import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { BookmarkInfo, Login, Bookmarks, NavBar, SignUp } from ".";
const App = () => {
	return (
		<>
			<CssBaseline />
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
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/signup" element={<SignUp />} />
					<Route
						exact
						path="/bookmark/:bookmarkId"
						element={<BookmarkInfo />}
					/>
				</Routes>
			</Box>
		</>
	);
};
export default App;
