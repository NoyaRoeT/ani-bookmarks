import { useRef } from "react";
import BookmarkForm from "../BookmarkForm";

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
		<BookmarkForm
			titleRef={titleRef}
			typeRef={typeRef}
			genreRef={genreRef}
			imageRef={imageRef}
			modalRef={modal}
			onClose={onClose}
			onSubmit={addBookmarkHandler}
		/>
	);
};

export default AddBookmark;
