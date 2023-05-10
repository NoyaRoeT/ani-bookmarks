import SearchBar from "./SearchBar";

const Header = ({ onAddBookmark }) => {
	return (
		<div className="w-full flex justify-center items-center">
			<SearchBar onAddBookmark={onAddBookmark} />
		</div>
	);
};

export default Header;
