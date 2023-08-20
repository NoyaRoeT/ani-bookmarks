import React, { useState, useEffect, useContext } from "react";
import { Container, Box, Typography } from "@mui/material";
import { Page, BookmarkList, ErrorFlash } from "../components";
import { getFavoriteBookmarks } from "../utils/bookmarks";
import { AuthContext } from "../context/AuthContext";

const Favorite = () => {
	const authContext = useContext(AuthContext);
	const [isFetching, setIsFetching] = useState(false);
	const [bookmarks, setBookmarks] = useState([]);

	const [error, setError] = useState("");
	const open = error.length !== 0;

	useEffect(() => {
		(async () => {
			try {
				setIsFetching(true);
				const res = await getFavoriteBookmarks();
				setBookmarks(res.data);
			} catch (err) {
				if (err.response && err.response.data.error.type == 0) {
					authContext.setUser(null);
				}
				if (err.response && err.response.status === 500) {
					setError("Something went wrong!");
				}
			} finally {
				setIsFetching(false);
			}
		})();
	}, []);

	return (
		<>
			<ErrorFlash
				sx={{ width: { sm: "720px" }, ml: { sm: "120px" } }}
				open={open}
				onClose={() => setError("")}
				text={error}
			/>

			<BookmarkList bookmarks={bookmarks} isFetching={isFetching} />
		</>
	);
};

export default Favorite;
