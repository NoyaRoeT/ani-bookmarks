import { useRef } from "react";
import BookmarkForm from "../../BookmarkForm";

const ANIME = 0;
const MANGA = 1;
const MANHWA = 2;
const MANHUA = 3;

const Card = ({ bookmark, onAddBookmark }) => {
	const modalRef = useRef();
	const titleRef = useRef();
	const genreRef = useRef();
	const typeRef = useRef();
	const imageRef = useRef();

	function openEditHandler(event) {
		modalRef.current.showModal();
	}
	function closeEditHandler(event) {
		modalRef.current.close();
	}

	async function editBookmarkHandler(event) {
		event.preventDefault();
		const formData = new FormData();
		formData.append("title", titleRef.current.value);
		formData.append("genres", [genreRef.current.value]);
		formData.append("type", typeRef.current.value);
		formData.append("image", imageRef.current.files[0]);
		try {
			const response = await fetch(
				`http://localhost:6001/bookmarks/${bookmark._id}`,
				{
					method: "PUT",
					body: formData,
					credentials: "include",
					withCredentials: true,
				}
			);

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

	async function deleteBookmarkHandler(event) {
		try {
			const response = await fetch(
				`http://localhost:6001/bookmarks/${bookmark._id}`,
				{
					method: "DELETE",
					credentials: "include",
					withCredentials: true,
				}
			);

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
		<>
			<div className="w-[310px] h-[460px] m-6 relative rounded-xl overflow-hidden border-none">
				<div className="w-full h-full">
					<img
						className="w-full h-full"
						src={
							bookmark.imagePath
								? bookmark.imagePath
								: "https://via.placeholder.com/400"
						}
					></img>
				</div>
				<div className="bg-[#343739] pt-4 pr-6 pb-6 pl-6 absolute bottom-0 left-0 right-0">
					<span
						onClick={openEditHandler}
						className="uppercase text-sm tracking-wide font-medium text-[#f0f0f0]"
					>
						{bookmark.type == 0
							? "anime"
							: bookmark.type == 1
							? "manga"
							: bookmark.type == 2
							? "manhwa"
							: "manhua"}
					</span>
					<h3
						onClick={deleteBookmarkHandler}
						className="mt-1 font-sans text-[#f9d3b4]"
					>
						{bookmark.title}
					</h3>
				</div>
			</div>
			<BookmarkForm
				titleRef={titleRef}
				typeRef={typeRef}
				genreRef={genreRef}
				imageRef={imageRef}
				modalRef={modalRef}
				onClose={closeEditHandler}
				onSubmit={editBookmarkHandler}
			/>
		</>
	);
};

export default Card;
