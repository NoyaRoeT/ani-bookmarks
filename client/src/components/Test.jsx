import React from "react";
import {
	Box,
	Dialog,
	DialogContent,
	Divider,
	Paper,
	Button,
	FormControl,
	TextField,
	DialogTitle,
} from "@mui/material";
import { ComboBox } from "./";

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

const Test = () => {
	return (
		<Dialog scroll="body" fullWidth open maxWidth="md">
			<DialogTitle>Add a bookmark</DialogTitle>
			<DialogContent>
				<Box sx={{ display: "flex" }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box maxWidth={"244px"} minWidth={"224px"}>
							<img
								width={"100%"}
								height={"300px"}
								src="https://via.placeholder.com/400"
							/>
						</Box>
						<FormControl>
							<Button variant="contained" component="label">
								Upload Image
								<input type="file" hidden />
							</Button>
						</FormControl>
					</Box>
					<Divider
						sx={{ mx: "24px" }}
						flexItem
						orientation="vertical"
					/>
					<Box>
						<TextField
							margin="normal"
							required
							fullWidth
							id="title"
							label="Title"
							name="title"
							autoFocus
						/>
						<ComboBox label={"Genre"} />
						<ComboBox label={"Tags"} />
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default Test;
