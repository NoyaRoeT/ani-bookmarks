import Joi from "joi";
import GenreStore from "../utils/GenreStore.js";

function bookmarkSchema() {
	return Joi.object({
		title: Joi.string().alphanum().min(1).max(200).required(),
		genres: Joi.array()
			.items(Joi.string().valid(...Object.keys(GenreStore.getMap())))
			.min(1)
			.max(5)
			.unique()
			.required(),
		type: Joi.number().integer().min(0).max(3),
	});
}

export default bookmarkSchema;
