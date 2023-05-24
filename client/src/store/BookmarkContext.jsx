import React, { useState } from "react";
import { fetchBookmarks } from "../services/bookmarks";

export const BookmarkContext = React.createContext({
	bookmarks: [],
	setBookmarks: () => {},
	getBookmarks: async () => {},
});

const BookmarkContextProvider = ({ children }) => {
	const [bookmarks, setBookmarks] = useState([]);

	async function getBookmarks() {
		const res = await fetchBookmarks();
		if (!res.error) {
			setBookmarks(res.data);
		}
	}

	return (
		<BookmarkContext.Provider
			value={{ bookmarks, setBookmarks, getBookmarks }}
		>
			{children}
		</BookmarkContext.Provider>
	);
};

export default BookmarkContextProvider;
