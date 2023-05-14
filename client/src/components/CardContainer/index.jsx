import Card from "./Card";
const CardContainer = ({ bookmarks, onAddBookmark }) => {
	return (
		<div className="p-10 md:p-16 flex justify-center items-center flex-wrap">
			{bookmarks.map((b) => (
				<Card key={b._id} bookmark={b} onAddBookmark={onAddBookmark} />
			))}
		</div>
	);
};

export default CardContainer;
