import React from "react";
import { BookmarkForm, Page } from "../components";
import { addBookmark } from "../utils/bookmarks";
import { useNavigate } from "react-router-dom";

const Add = () => {
	const navigate = useNavigate();
	async function addHandler(bookmark) {
		try {
			const res = await addBookmark(bookmark);
			navigate(`/bookmarks/info/${res.data._id}`);
		} catch (err) {
			console.log(err.response.data);
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
