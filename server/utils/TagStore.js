import Tag from "../models/tag.js";

const TagStore = (() => {
	const TagMap = {};

	return {
		init: async () => {
			console.log("Initialising TagStore");
			try {
				const tags = await Tag.find({});
				TagStore.addAll(...tags);
			} catch (err) {
				console.log(err.message);
			}
		},
		getMap: () => TagMap,
		add: (tag) => {
			TagMap[tag.name] = tag.id;
		},
		addAll: function () {
			for (let i = 0; i != arguments.length; ++i) {
				const arg = arguments[i];
				TagMap[arg.name] = arg.id;
			}
		},
	};
})();

export default TagStore;
