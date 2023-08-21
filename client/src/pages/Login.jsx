import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Box, Typography, Alert } from "@mui/material";
import { ErrorFlash, Logo } from "../components";
import { login } from "../utils/auth";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "@emotion/react";

export default function Login() {
	const theme = useTheme();

	const authContext = useContext(AuthContext);
	const navigate = useNavigate();
	const { from } = useLocation().state || { from: { pathname: "/home" } };

	// Feedback state
	const [disableLogin, setDisableLogin] = useState(false);
	const [error, setError] = useState("");
	const open = error.length !== 0;

	const [authError, setAuthError] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const dataObj = {};
		data.forEach((value, key) => (dataObj[key] = value));

		try {
			setError("");
			setAuthError(false);
			setDisableLogin(true);
			const res = await login(dataObj);
			authContext.setUser(res.data);
			navigate(from.pathname);
		} catch (err) {
			authContext.setUser(null);

			if (err.response && err.response.status === 500) {
				setError("Something went wrong!");
			} else if (err.response && err.response.status === 401) {
				setAuthError(true);
			}
		} finally {
			setDisableLogin(false);
		}
	};

	return (
		<>
			<ErrorFlash
				sx={{ width: { sm: "720px" } }}
				open={open}
				onClose={() => setError("")}
				text={error}
			/>
			<Container
				component="main"
				maxWidth="xs"
				sx={{
					backgroundColor: theme.palette.background.paper,
					boxShadow: theme.shadows[1],
					mt: 8,
					pt: 4,
					pb: 10,
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						px: 2,
					}}
				>
					<Logo sx={{ mb: 2 }} />

					<Typography component="h1" variant="h5">
						Login
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						{authError && (
							<Alert
								sx={{ width: "100%", mt: 1 }}
								severity="error"
							>
								Invalid credentials.
							</Alert>
						)}
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							error={authError}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							error={authError}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={disableLogin}
						>
							Sign In
						</Button>
						<Box
							sx={{ display: "flex", justifyContent: "flex-end" }}
						>
							<Link to="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Box>
					</Box>
				</Box>
			</Container>
		</>
	);
}
