import { useRef } from "react";

const AddBookmark = ({ onClose, modal, onAddBookmark }) => {
	const titleRef = useRef();
	const genreRef = useRef();
	const typeRef = useRef();
	const imageRef = useRef();

	async function addBookmarkHandler(event) {
		event.preventDefault();
		const formData = new FormData();
		formData.append("title", titleRef.current.value);
		formData.append("genres", [genreRef.current.value]);
		formData.append("type", typeRef.current.value);
		formData.append("image", imageRef.current.files[0]);
		try {
			const response = await fetch("http://localhost:6001/bookmarks/", {
				method: "POST",
				body: formData,
				credentials: "include",
				withCredentials: true,
			});

			const { error } = await response.json();
			if (!error) {
				onAddBookmark();
				onClose();
			} else {
				console.log(error.message);
			}
		} catch (err) {
			console.log(err.message);
		}
	}

	return (
		<dialog
			className="h-3/6 w-4/5 top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
			ref={modal}
		>
			<form
				className="flex flex-col space-y-4 w-full py-2 px-4"
				onSubmit={addBookmarkHandler}
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

export default AddBookmark;
