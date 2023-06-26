import React from "react";
import { BookmarkForm, Page } from "../components";
import { addBookmark } from "../utils/bookmarks";

const Add = () => {
	async function addHandler(bookmark) {
		try {
			const res = await addBookmark(bookmark);
			console.log(res);
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
