import { CssBaseline } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";

import { CheckAuth, ProtectedRoute } from "./components";
import Search from "./pages/Search";
import Info from "./pages/Info";
import Add from "./pages/Add";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Edit from "./pages/Edit";

function App() {
	return (
		<>
			<CheckAuth />
			<CssBaseline />
			<Routes>
				<Route path="/" element={<ProtectedRoute />}>
					<Route path="search" element={<Search />} />
					<Route path="new" element={<Add />} />
				</Route>
				<Route path="/bookmarks/" element={<ProtectedRoute />}>
					<Route path="info/:bookmarkId" element={<Info />} />
					<Route path="edit/:bookmarkId" element={<Edit />} />
				</Route>
				<Route path="/" element={<ProtectedRoute noAuth />}>
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<SignUp />} />
				</Route>
				<Route path="*" element={<Navigate to="/search" />} />
			</Routes>
		</>
	);
}

export default App;
