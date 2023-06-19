import React from "react";
import { IconButton, Paper, Toolbar, Box } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import SortIcon from "@mui/icons-material/Sort";
import { Page, SearchBar } from "../components";

const Search = () => {
	return (
		<Page>
			<Paper elevation={0}>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							flexGrow: 1,
							display: "flex",
							justifyContent: "center",
						}}
					>
						<SearchBar />
					</Box>
					<Box sx={{ display: "flex" }}>
						<IconButton>
							<ManageSearchIcon />
						</IconButton>
						<IconButton>
							<SortIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</Paper>
		</Page>
	);
};

export default Search;
