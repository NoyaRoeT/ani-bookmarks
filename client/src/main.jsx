import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
	palette: {
		background: {
			default: "rgb(250, 251, 251)",
		},
	},
	shadows: {
		1: "rgba(90, 114, 123, 0.11) 0px 7px 30px 0px",
	},
	typography: {
		button: {
			textTransform: "none",
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
