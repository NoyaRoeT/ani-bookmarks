import Genre from "../models/genre.js";

const GenreStore = (() => {
	const genreMap = {};

	return {
		init: async () => {
			console.log("Initialising GenreStore");
			try {
				const genres = await Genre.find({});
				GenreStore.addAll(...genres);
			} catch (err) {
				console.log(err.message);
			}
		},
		getMap: () => genreMap,
		add: (genre) => {
			genreMap[genre.name] = genre.id;
		},
		addAll: function () {
			for (let i = 0; i != arguments.length; ++i) {
				const arg = arguments[i];
				genreMap[arg.name] = arg.id;
			}
		},
	};
})();

export default GenreStore;
