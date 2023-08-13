import Joi from "joi";

function userSchema() {
	return Joi.object({
		email: Joi.string()
			.empty("")
			.max(200)
			.pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
			.required()
			.messages({
				"string.base": `Invalid email`,
				"string.pattern.base": `Invalid email`,
				"string.max": `Email should have a maximum length of {#limit}`,
				"any.required": `Email is a required field`,
			}),
		username: Joi.string().empty("").max(20).min(4).required().messages({
			"string.base": `Invalid username`,
			"string.max": `Username should have a maximum length of {#limit}`,
			"string.min": `Username should have a minimum length of {#limit}`,
			"any.required": `Username is a required field`,
		}),
		password: Joi.string()
			.empty("")
			.max(200)
			.pattern(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
			)
			.required()
			.messages({
				"string.base": `Invalid password`,
				"string.pattern.base": `Password must contain at least eight characters, with minimum one uppercase letter, one lower case letter, a number and special character.`,
				"string.max": `Password should have a maximum length of {#limit}`,
				"any.required": `Password is a required field`,
			}),
	});
}

export default userSchema;
