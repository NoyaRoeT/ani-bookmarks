import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import AuthContextProvider from "./store/AuthContext";
import BookmarkContextProvider from "./store/BookmarkContext";
const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<AuthContextProvider>
				<BookmarkContextProvider>
					<App />
				</BookmarkContextProvider>
			</AuthContextProvider>
		</ThemeProvider>
	</BrowserRouter>
);
