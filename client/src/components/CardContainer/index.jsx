import Card from "./Card";
const CardContainer = ({ bookmarks }) => {
	return (
		<div className="p-10 md:p-16 flex justify-center items-center flex-wrap">
			{bookmarks.map((b) => (
				<Card key={b.id} bookmark={b} />
			))}
		</div>
	);
};

export default CardContainer;
