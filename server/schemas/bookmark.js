import Joi from "joi";
import GenreStore from "../utils/GenreStore.js";
import TagStore from "../utils/TagStore.js";

function bookmarkSchema() {
	return Joi.object({
		title: Joi.string().min(1).max(200).required(),
		genres: Joi.array()
			.items(Joi.string().valid(...Object.keys(GenreStore.getMap())))
			.min(1)
			.max(5)
			.unique()
			.required(),
		tags: Joi.array()
			.items(Joi.string().valid(...Object.keys(TagStore.getMap())))
			.max(20)
			.unique(),
		type: Joi.string().valid("anime", "manga", "manhwa", "manhua", "novel"),
		image: Joi.any(),
	});
}

export default bookmarkSchema;
