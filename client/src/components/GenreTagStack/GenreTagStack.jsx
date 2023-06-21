import React from "react";
import { Box, Chip } from "@mui/material";

const GenreTagStack = ({ sx, genres, tags }) => {
	const genresLen = genres.length;
	const genresAndTags = genres.concat(tags);

	return (
		<Box sx={{ display: "flex", flexWrap: "wrap", ...sx }}>
			{genresAndTags.map((item, i) => {
				if (i >= 20) {
					return;
				}

				return (
					<Chip
						sx={{ mr: "4px", mt: "4px" }}
						key={item}
						color="primary"
						size="small"
						variant={i < genresLen ? "filled" : "outlined"}
						label={item}
					/>
				);
			})}
		</Box>
	);
};

export default GenreTagStack;
