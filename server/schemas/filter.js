import Joi from "joi";
import GenreStore from "../utils/GenreStore.js";
import TagStore from "../utils/TagStore.js";

function searchSchema() {
	return Joi.object({
		title: Joi.string().max(200).allow(""),
		genres: Joi.array()
			.items(Joi.string().valid(...Object.keys(GenreStore.getMap())))
			.max(5)
			.unique(),
		tags: Joi.array()
			.items(Joi.string().valid(...Object.keys(TagStore.getMap())))
			.max(20)
			.unique(),
		type: Joi.string().valid("anime", "manga", "manhwa", "manhua", "novel"),
	});
}

export default searchSchema;
