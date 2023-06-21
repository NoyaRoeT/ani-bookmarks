import { CssBaseline, Typography } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";

import { AppDrawer, ProtectedRoute } from "./components";
import Search from "./pages/Search";
import Info from "./pages/Info";

function App() {
	return (
		<>
			<CssBaseline />
			<AppDrawer />
			<Routes>
				<Route path="/" element={<ProtectedRoute />}>
					<Route path="search" element={<Search />} />
				</Route>
				<Route path="/bookmarks/" element={<ProtectedRoute />}>
					<Route path=":bookmarkId" element={<Info />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
