import {
	Dialog,
	DialogContent,
	Typography,
	Box,
	Divider,
	Stack,
	Paper,
	DialogTitle,
	Grid,
} from "@mui/material";

const Item = ({ color, children }) => {
	return (
		<Paper
			sx={{
				fontSize: "12px",
				color: "white",
				px: "8px",
				py: "4px",
				bgcolor: color,
			}}
		>
			{children}
		</Paper>
	);
};

const BookmarkInfo = () => {
	return (
		<Dialog scroll="body" fullWidth open maxWidth="md">
			<DialogTitle>Tensei Shitara Slime Datta Ken</DialogTitle>
			<DialogContent>
				<Grid container>
					<Grid
						item
						xs={12}
						md={3}
						sx={{ display: "flex", justifyContent: "center" }}
					>
						<Box
							sx={{
								my: "12px",
							}}
							maxWidth={"244px"}
							minWidth={"224px"}
						>
							<img
								width={"100%"}
								height={"300px"}
								style={{ objectFit: "cover" }}
								src="https://via.placeholder.com/400"
							/>
						</Box>
					</Grid>
					<Divider
						sx={{
							mx: "24px",
							display: { xs: "none", md: "block" },
						}}
						flexItem
						orientation="vertical"
					/>
					<Grid item xs={12} md={8}>
						<Box
							sx={{
								p: "12px",
								display: { xs: "flex", md: "block" },
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography variant="subtitle1" sx={{ mb: "12px" }}>
								Type: Manga
							</Typography>

							<Stack spacing={1} direction="row">
								<Item color="#1565c0">Action</Item>
								<Item color="#1565c0">Fantasy</Item>
								<Item color="#42a5f5">Sci-Fi</Item>
								<Item color="#42a5f5">Regression</Item>
								<Item color="#42a5f5">Isekai</Item>
							</Stack>
							<Divider sx={{ my: "12px" }} />
						</Box>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
};

export default BookmarkInfo;
