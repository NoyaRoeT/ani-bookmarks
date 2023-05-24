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
	IconButton,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useContext } from "react";
import { deleteBookmark } from "../../services/bookmarks";
import { AuthContext } from "../../store/AuthContext";
import { BookmarkContext } from "../../store/BookmarkContext";

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
	const [openDelete, setOpenDelete] = useState(false);
	const [deleteError, setDeleteError] = useState(null);
	const ctx = useContext(AuthContext);
	const bookmarks = useContext(BookmarkContext);

	async function handleDelete() {
		try {
			const res = await deleteBookmark(bookmark._id);
			if (!res.error) {
				deleteError && setDeleteError(null);
				setOpenDelete(false);
				onClose();
				bookmarks.getBookmarks();
			} else if (res.error.type === 0) {
				deleteError && setDeleteError(null);
				ctx.setIsAuthenticated(false);
				setOpenDelete(false);
				onClose();
			} else {
				setOpenDelete(false);
				setDeleteError(res.error.message);
			}
		} catch (err) {
			setDeleteError(err.message);
			setOpenDelete(false);
		}
	}
	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				scroll="body"
				fullWidth
				maxWidth="md"
			>
				<Box display="flex">
					<DialogTitle sx={{ flexGrow: 1 }}>
						{bookmark.title}
					</DialogTitle>
					<IconButton
						size="large"
						color="inherit"
						aria-label="delete"
						sx={{ mr: 2 }}
						onClick={() => {
							setOpenDelete(true);
						}}
					>
						<DeleteIcon />
					</IconButton>
				</Box>
				<DialogContent>
					{deleteError && (
						<Alert severity="error">{deleteError}</Alert>
					)}
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
								<Typography
									variant="subtitle1"
									sx={{ mb: "12px" }}
								>
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
			{/* Delete confirmation alert */}
			<Dialog
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Delete this bookmark?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDelete(false)}>Cancel</Button>
					<Button color="error" onClick={handleDelete} autoFocus>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default BookmarkInfo;
