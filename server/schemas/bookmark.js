import Joi from "joi";
import GenreStore from "../utils/GenreStore.js";
import TagStore from "../utils/TagStore.js";

function bookmarkSchema() {
	return Joi.object({
		// Title is required, should only contain alphanums and some puncutations, cannot be an empty string
		title: Joi.string()
			.empty("")
			.min(1)
			.max(200)
			.pattern(/^[a-z0-9 "'!?,.]+$/i)
			.required()
			.messages({
				"string.base": `Title should be a string containining only alphanumeric characters, whitespaces, "'", ",", "!", "?" and '"'`,
				"string.pattern.base": `Title should only contain alphanumeric characters, whitespaces, "'", ",", "!", "?" and '"'`,
				"string.min": `Title cannot be empty`,
				"string.max": `Title should have a maximum length of {#limit}`,
				"any.required": `Title is a required field`,
			}),
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
		imageUrl: Joi.string(),
	});
}

export default bookmarkSchema;
