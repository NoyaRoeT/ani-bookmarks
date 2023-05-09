const SearchBar = () => {
	return (
		<div className=" bg-[#1f2123] w-9/12 flex justify-between items-center mt-16 mx-0 mb-8 py-6 px-6 rounded-3xl">
			<input
				className="w-full flex border-none text-xl font-medium pr-4 outline-none text-[#a1a1a1] bg-[#1f2123]"
				type="text"
				placeholder="Search bookmarks..."
			/>
			<button className="cursor-pointer" type="button">
				<i class="fa fa-search fa-lg"></i>
			</button>
		</div>
	);
};

export default SearchBar;
