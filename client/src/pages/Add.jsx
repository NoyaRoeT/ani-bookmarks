import React from "react";
import { BookmarkForm, Page } from "../components";

const Add = () => {
	function addHandler(bookmark) {
		console.log(bookmark);
	}
	return (
		<Page>
			<BookmarkForm onSubmit={addHandler} />
		</Page>
	);
};

export default Add;
