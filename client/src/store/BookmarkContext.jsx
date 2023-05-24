import React, { useState } from "react";
import { fetchBookmarks } from "../services/bookmarks";

export const BookmarkContext = React.createContext({
	bookmarks: [],
	setBookmarks: () => {},
	getBookmarks: async () => {},
	isLoading: false,
	setIsLoading: () => {},
});

const BookmarkContextProvider = ({ children }) => {
	const [bookmarks, setBookmarks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	async function getBookmarks() {
		try {
			setIsLoading(true);
			const res = await fetchBookmarks();
			if (!res.error) {
				setBookmarks(res.data);
			}
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<BookmarkContext.Provider
			value={{
				bookmarks,
				setBookmarks,
				getBookmarks,
				isLoading,
				setIsLoading,
			}}
		>
			{children}
		</BookmarkContext.Provider>
	);
};

export default BookmarkContextProvider;
