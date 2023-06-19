import { CssBaseline, Typography } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";

import { AppDrawer, ProtectedRoute } from "./components";
import Search from "./pages/Search";

function App() {
	return (
		<>
			<CssBaseline />
			<AppDrawer />
			<Routes>
				<Route path="/" element={<ProtectedRoute />}>
					<Route path="search" element={<Search />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
