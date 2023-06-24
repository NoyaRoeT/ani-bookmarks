import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";

const theme = createTheme({
	palette: {
		background: {
			default: "rgb(248, 249, 249)",
		},
	},

	typography: {
		button: {
			textTransform: "none",
		},
	},
});

theme.shadows[1] = "rgba(90, 114, 123, 0.11) 0px 7px 30px 0px";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<AuthContextProvider>
					<App />
				</AuthContextProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
