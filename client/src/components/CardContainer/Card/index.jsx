const Card = () => {
	return (
		<div className="w-[310px] h-[460px] m-6 relative rounded-xl overflow-hidden border-none">
			<div className="w-full h-full">
				<img
					className="w-full h-full"
					src="https://via.placeholder.com/400"
				></img>
			</div>
			<div className="bg-[#343739] pt-4 pr-6 pb-6 pl-6 absolute bottom-0 left-0 right-0">
				<span className="uppercase text-sm tracking-wide font-medium text-[#f0f0f0]">
					Manga
				</span>
				<h3 className="mt-1 font-sans text-[#f9d3b4]">
					Transmigrator's Privilege
				</h3>
			</div>
		</div>
	);
};

export default Card;
