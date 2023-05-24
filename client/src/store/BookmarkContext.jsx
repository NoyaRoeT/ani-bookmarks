import React, { useState } from "react";

export const BookmarkContext = React.createContext({
	bookmarks: [],
	setBookmarks: () => {},
});

const BookmarkContextProvider = ({ children }) => {
	const [bookmarks, setBookmarks] = useState([]);
	return (
		<BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>
			{children}
		</BookmarkContext.Provider>
	);
};

export default BookmarkContextProvider;
