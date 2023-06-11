import React, { useContext, useState } from "react";
import { Container, CircularProgress, Grid, Link, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../store/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../services/auth";

export default function Login() {
	const ctx = useContext(AuthContext);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const { from } = useLocation().state || { from: { pathname: "/" } };
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const body = {};
		data.forEach((value, key) => (body[key] = value));
		setIsLoading(true);
		try {
			const result = await login(body);
			if (result) {
				ctx.setIsAuthenticated(true);
				if (isError) {
					setIsError(false);
				}
				navigate(from.pathname);
			} else {
				setIsError(true);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper
				sx={{
					p: "32px",
					borderRadius: 4,
					marginTop: 8,
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
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						error={isError}
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						error={isError}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Box sx={{ position: "relative" }}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disabled={isLoading}
							sx={{ mt: 3, mb: 3 }}
						>
							Sign In
						</Button>
						{isLoading && (
							<CircularProgress
								size={24}
								sx={{
									position: "absolute",
									top: "50%",
									left: "50%",
									marginTop: "-12px",
									marginLeft: "-12px",
								}}
							/>
						)}
					</Box>
				</Box>
				<Grid container>
					<Grid item xs></Grid>
					<Grid item>
						<Link href="/signup" variant="body2">
							{"Don't have an account? Sign Up"}
						</Link>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}
