import React, { useState } from "react";
import { fetchBookmarks } from "../services/bookmarks";

export const BookmarkContext = React.createContext({
	bookmarks: [],
	setBookmarks: () => {},
	getBookmarks: async () => {},
	isLoading: false,
	setIsLoading: () => {},
	genres: [],
	setGenres: () => {},
	tags: [],
	setTags: () => {},
});

const BookmarkContextProvider = ({ children }) => {
	const [bookmarks, setBookmarks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [genres, setGenres] = useState([]);
	const [tags, setTags] = useState([]);

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
				genres,
				setGenres,
				tags,
				setTags,
			}}
		>
			{children}
		</BookmarkContext.Provider>
	);
};

export default BookmarkContextProvider;
