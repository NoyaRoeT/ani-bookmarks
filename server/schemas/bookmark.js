import Joi from "joi";

function bookmarkSchema() {
	return Joi.object({
		title: Joi.string().alphanum().min(1).max(200).required(),
		genres: Joi.array()
			.items(Joi.string().min(1).max(50))
			.min(1)
			.max(10)
			.unique()
			.required(),
		type: Joi.number().integer().min(0).max(3),
	});
}

export default bookmarkSchema;
