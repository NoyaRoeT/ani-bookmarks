import React, { useContext, useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../store/context";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
	const ctx = useContext(AuthContext);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const { from } = useLocation().state || { from: { pathname: "/" } };
	console.log(from);
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const body = {};
		data.forEach((value, key) => (body[key] = value));
		setIsLoading(true);
		try {
			const response = await fetch("http://localhost:6001/auth/login", {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				withCredentials: true,
			});
			const resData = await response.json();
			if (!resData.error) {
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
			<Box
				sx={{
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
			</Box>
		</Container>
	);
}
