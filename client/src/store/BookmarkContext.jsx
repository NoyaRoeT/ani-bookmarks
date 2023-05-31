import React, { useState } from "react";
import { fetchBookmarks, searchBookmarks } from "../services/bookmarks";

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
	filter: {},
	setFilter: () => {},
});

const BookmarkContextProvider = ({ children }) => {
	const [bookmarks, setBookmarks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [genres, setGenres] = useState([]);
	const [tags, setTags] = useState([]);
	const [filter, setFilter] = useState({});

	async function getBookmarks() {
		try {
			setIsLoading(true);
			const res = await searchBookmarks(filter);
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
				filter,
				setFilter,
			}}
		>
			{children}
		</BookmarkContext.Provider>
	);
};

export default BookmarkContextProvider;
