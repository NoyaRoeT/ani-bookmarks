const BookmarkForm = ({
	modalRef,
	titleRef,
	genreRef,
	typeRef,
	imageRef,
	onClose,
	onSubmit,
}) => {
	return (
		<dialog
			className="h-3/6 w-4/5 top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
			ref={modalRef}
		>
			<form
				className="flex flex-col space-y-4 w-full py-2 px-4"
				onSubmit={onSubmit}
				encType="multipart/form-data"
			>
				<div className="flex flex-col space-y-2">
					<label className="text-xl" htmlFor="title">
						Title
					</label>
					<input
						className="text-xl p-2"
						type="text"
						id="title"
						placeholder="Title"
						ref={titleRef}
					/>
				</div>
				<div className="flex flex-col space-y-2">
					<label className="text-xl" htmlFor="genre">
						Genre
					</label>
					<input
						className="text-xl p-2"
						type="text"
						id="genre"
						placeholder="Genre"
						ref={genreRef}
					/>
				</div>
				<div className="flex flex-col space-y-2">
					<label className="text-xl" htmlFor="type">
						Type
					</label>
					<input
						className="text-xl p-2"
						type="number"
						min={0}
						max={3}
						id="type"
						placeholder="Type"
						value={0}
						ref={typeRef}
					/>
				</div>
				<div className="flex flex-col space-y-2">
					<label className="text-xl" htmlFor="image">
						Image
					</label>
					<input
						className="text-xl p-2"
						type="file"
						id="image"
						ref={imageRef}
					/>
				</div>
				<div className="flex justify-end space-x-5">
					<button
						className="w-20 mt-4 p-2 tracking-wide text-[#f9d3b4] bg-[#1f2123] border-[#b89579] border-2 border-solid"
						onClick={onClose}
						type="button"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="w-20 mt-4 p-2 tracking-wide text-[#f9d3b4] bg-[#1f2123] border-[#b89579] border-2 border-solid"
					>
						Add
					</button>
				</div>
			</form>
		</dialog>
	);
};

export default BookmarkForm;
