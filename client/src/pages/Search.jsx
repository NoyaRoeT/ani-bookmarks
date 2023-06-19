import React, { useState } from "react";
import { IconButton, Paper, Toolbar, Box } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import SortIcon from "@mui/icons-material/Sort";
import { Page, SearchBar, ServerSearch } from "../components";

const typeOptions = ["Type 1", "Loooooooooooooooooooooooong Type", "short"];
const genreOptions = ["Genre 1", "Looooooooooooooooooooooong Genre", "short"];

const Search = () => {
	const [openServerSearch, setOpenServerSearch] = useState(false);

	function toggleServerSearchHandler() {
		setOpenServerSearch((prev) => !prev);
	}

	function serverSearchHandler(res) {
		console.log(res);
	}

	function localSearchHandler(res) {
		console.log(res);
	}

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
						<SearchBar onSubmit={localSearchHandler} />
					</Box>
					<Box sx={{ display: "flex" }}>
						<IconButton onClick={toggleServerSearchHandler}>
							<ManageSearchIcon />
						</IconButton>
						<IconButton>
							<SortIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</Paper>
			<ServerSearch
				open={openServerSearch}
				onClose={toggleServerSearchHandler}
				onSubmit={serverSearchHandler}
				genreOptions={genreOptions}
				tagOptions={genreOptions}
				typeOptions={typeOptions}
			/>
		</Page>
	);
};

export default Search;
