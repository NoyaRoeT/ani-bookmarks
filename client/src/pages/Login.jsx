import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import { ErrorFlash, Logo } from "../components";
import { login } from "../utils/auth";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
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

			<Grid container component="main" sx={{ height: "100vh" }}>
				<Logo
					sx={{ position: "fixed", backgroundColor: "#fff", pr: 1 }}
				/>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage:
							"url(https://r4.wallpaperflare.com/wallpaper/268/96/863/anime-anime-girls-original-characters-short-hair-wallpaper-9e621b77801cfc9def497dfeb6dafe8e.jpg)",
						backgroundRepeat: "no-repeat",
						backgroundColor: (t) =>
							t.palette.mode === "light"
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<Grid
					item
					xs={12}
					sm={8}
					md={5}
					component={Paper}
					elevation={6}
					square
				>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>

						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit}
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
							<Grid container>
								<Grid item xs></Grid>
								<Grid item>
									<Link to="/signup" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}
