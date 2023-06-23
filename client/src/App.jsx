import { CssBaseline } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";

import { AppDrawer, ProtectedRoute } from "./components";
import Search from "./pages/Search";
import Info from "./pages/Info";
import Add from "./pages/Add";

function App() {
	return (
		<>
			<CssBaseline />
			<AppDrawer />
			<Routes>
				<Route path="/" element={<ProtectedRoute />}>
					<Route path="search" element={<Search />} />
					<Route path="new" element={<Add />} />
				</Route>
				<Route path="/bookmarks/" element={<ProtectedRoute />}>
					<Route path=":bookmarkId" element={<Info />} />
				</Route>
				<Route path="*" element={<Navigate to="/search" />} />
			</Routes>
		</>
	);
}

export default App;
