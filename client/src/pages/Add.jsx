import React, { useContext, useState } from "react";
import { BookmarkForm, ErrorFlash, Page } from "../components";
import { addBookmark } from "../utils/bookmarks";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Add = () => {
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);

	const [error, setError] = useState("");
	const open = error.length !== 0;

	async function addHandler(bookmark) {
		try {
			const res = await addBookmark(bookmark);
			navigate(`/bookmarks/info/${res.data._id}`);
		} catch (err) {
			if (err.response && err.response.data.error.type == 0) {
				authContext.setUser(null);
			}
			if (err.response && err.response.status === 500) {
				setError("Something went wrong!");
			}
		}
	}
	return (
		<Page>
			<ErrorFlash
				sx={{ width: { sm: "720px" }, ml: { sm: "120px" } }}
				open={open}
				onClose={() => setError("")}
				text={error}
			/>
			<BookmarkForm
				onSubmit={addHandler}
				buttonLabel="Add"
				label="Add a Bookmark"
				onServerError={(err) => setError(err)}
			/>
		</Page>
	);
};

export default Add;
