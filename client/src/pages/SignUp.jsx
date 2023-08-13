import React, { useState, useReducer } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Logo, ErrorFlash } from "../components";
import { signup } from "../utils/auth";
import { validateSignUp } from "../utils/helper";

const errorReducer = (state, action) => {
	if (action.type === "RESET") {
		return {
			email: "",
			username: "",
			password: "",
		};
	} else if (action.type === "EMAIL") {
		return {
			email: action.value,
			username: "",
			password: "",
		};
	} else if (action.type === "USERNAME") {
		return {
			email: "",
			username: action.value,
			password: "",
		};
	} else if (action.type === "PASSWORD") {
		return {
			email: "",
			username: "",
			password: action.value,
		};
	}
};

const SignUp = () => {
	const navigate = useNavigate();

	// Feedback state
	const [disableSignUp, setDisableSignUp] = useState(false);
	const [flashError, setFlashError] = useState("");
	const openFlash = flashError.length !== 0;

	// Error state
	const [error, dispatchError] = useReducer(errorReducer, {
		email: "",
		username: "",
		password: "",
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const dataObj = {};
		data.forEach((value, key) => (dataObj[key] = value));

		const { field, message } = validateSignUp(dataObj);

		if (field) {
			dispatchError({ type: field, value: message });
			// return;
		}
		dispatchError({ type: "RESET" });

		try {
			setFlashError("");
			setDisableSignUp(true);
			await signup(dataObj);
			navigate("/login");
		} catch (err) {
			if (err.response && err.response.status === 500) {
				setFlashError("Something went wrong!");
			}
		} finally {
			setDisableSignUp(false);
		}
	};

	return (
		<>
			<ErrorFlash
				sx={{ width: { sm: "720px" } }}
				open={openFlash}
				onClose={() => setFlashError("")}
				text={flashError}
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
							Sign Up
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								error={error.email.length > 0}
								helperText={error.email}
								inputProps={{
									maxLength: 200,
								}}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								autoFocus
								error={error.username.length > 0}
								helperText={error.username}
								inputProps={{
									maxLength: 20,
								}}
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
								error={error.password.length > 0}
								helperText={error.password}
								inputProps={{
									maxLength: 200,
								}}
							/>

							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								disabled={disableSignUp}
							>
								Sign Up
							</Button>
							<Grid container>
								<Grid item xs></Grid>
								<Grid item>
									<Link to="/login" variant="body2">
										{"Already have an account? Sign in!"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default SignUp;
