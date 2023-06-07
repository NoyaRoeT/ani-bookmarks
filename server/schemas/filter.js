import Joi from "joi";
import GenreStore from "../utils/GenreStore.js";
import TagStore from "../utils/TagStore.js";

function searchSchema() {
	return Joi.object({
		title: Joi.string()
			.empty("")
			.max(200)
			.pattern(/^[a-z0-9 "'!?,.]+$/i)
			.messages({
				"string.base": `Title should be a string containining only alphanumeric characters, whitespaces, "'", ",", "!", "?" and '"'`,
				"string.pattern.base": `Title should only contain alphanumeric characters, whitespaces, "'", ",", "!", "?" and '"'`,
				"string.max": `Title should have a maximum length of {#limit}`,
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
			.valid("anime", "manga", "manhwa", "manhua", "novel")
			.allow(""),
	});
}

export default searchSchema;
