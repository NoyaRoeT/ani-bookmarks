import { useRef } from "react";
import AddBookmark from "../../AddBookmark";

const SearchBar = ({ onAddBookmark }) => {
	const addBookmarkRef = useRef();
	function openAddBookmarkHandler(event) {
		addBookmarkRef.current.showModal();
	}
	function closeAddBookmarkHandler(event) {
		addBookmarkRef.current.close();
	}

	return (
		<div className=" bg-[#1f2123] w-9/12 flex justify-between items-center mt-16 mx-0 mb-8 py-6 px-6 rounded-3xl">
			<input
				className="w-full flex border-none text-xl font-medium pr-4 outline-none text-[#a1a1a1] bg-[#1f2123]"
				type="text"
				placeholder="Search bookmarks..."
			/>
			<button className="cursor-pointer" type="button">
				<i className="fa fa-search fa-lg"></i>
			</button>
			<button
				className="ml-4 cursor-pointer"
				type="button"
				onClick={openAddBookmarkHandler}
			>
				<i className="fa fa-solid fa-plus fa-lg"></i>
			</button>
			<AddBookmark
				modal={addBookmarkRef}
				onClose={closeAddBookmarkHandler}
				onAddBookmark={onAddBookmark}
			/>
		</div>
	);
};

export default SearchBar;
