import React from "react";
import { useParams } from "react-router-dom";
import {
	Button,
	Paper,
	Toolbar,
	Typography,
	Box,
	Grid,
	Container,
	Card,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Page } from "../components";

const Info = () => {
	const { bookmarkId } = useParams();

	return (
		<Page>
			<Paper>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						alignItems: "center",
					}}
				>
					<Button color="primary" variant="outlined" sx={{ mr: 1 }}>
						<EditIcon sx={{ mr: 1 }} />
						<Typography>Edit</Typography>
					</Button>
					<Button color="warning" variant="outlined">
						<DeleteIcon sx={{ mr: 1 }} />
						<Typography>Delete</Typography>
					</Button>
				</Toolbar>
			</Paper>
			<Container>
				<Card
					sx={{
						boxShadow: "rgba(90, 114, 123, 0.11) 0px 7px 30px 0px",
					}}
				>
					<Grid container maxWidth="lg">
						<Grid item xs={12}>
							yo
						</Grid>
						<Grid item xs={12}>
							hi
						</Grid>
					</Grid>
				</Card>
			</Container>
		</Page>
	);
};

export default Info;
