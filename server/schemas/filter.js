import Joi from "joi";
import GenreStore from "../utils/GenreStore.js";
import TagStore from "../utils/TagStore.js";

function searchSchema() {
	return Joi.object({
		title: Joi.string().empty("").max(200).messages({
			"string.max": `Title search should have a maximum length of {#limit}`,
		}),
		genres: Joi.array()
			.items(Joi.string().valid(...Object.keys(GenreStore.getMap())))
			.max(5)
			.unique(),
		tags: Joi.array()
			.items(Joi.string().valid(...Object.keys(TagStore.getMap())))
			.max(20)
			.unique(),
		type: Joi.string()
			.valid("Anime", "Manga", "Manhwa", "Manhua", "Novel")
			.allow(""),
		sortBy: Joi.string().required().valid("Last Added", "Rating"),
		favorite: Joi.boolean(),
	});
}

export default searchSchema;
