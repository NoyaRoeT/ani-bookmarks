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

const BookmarkInfo = ({ bookmark, open, onClose }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			scroll="body"
			fullWidth
			maxWidth="md"
		>
			<DialogTitle>{bookmark.title}</DialogTitle>
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
								src={
									bookmark.imagePath
										? bookmark.imagePath
										: "https://via.placeholder.com/400"
								}
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
								{bookmark.genres.map((g) => (
									<Item key={g.name} color="#1565c0">
										{g.name}
									</Item>
								))}
								{bookmark.tags.map((t) => (
									<Item key={t.name} color="#42a5f5">
										{t.name}
									</Item>
								))}
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
