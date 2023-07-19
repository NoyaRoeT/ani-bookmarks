import React, { useContext } from "react";
import { BookmarkForm, Page } from "../components";
import { addBookmark } from "../utils/bookmarks";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Add = () => {
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);
	async function addHandler(bookmark) {
		try {
			const res = await addBookmark(bookmark);
			navigate(`/bookmarks/info/${res.data._id}`);
		} catch (err) {
			if (err.response && err.response.data.error.type == 0) {
				authContext.setUser(null);
			}
			console.log(err.response.data.error.message);
		}
	}
	return (
		<Page>
			<BookmarkForm
				onSubmit={addHandler}
				buttonLabel="Add"
				label="Add a Bookmark"
			/>
		</Page>
	);
};

export default Add;
