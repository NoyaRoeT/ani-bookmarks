export function validateBookmark(bookmark) {
	// Check required fields
	if (!bookmark.title) {
		return { field: "TITLE", message: "Title is a required field." };
	}

	if (!bookmark.type) {
		return { field: "TYPE", message: "A type is required." };
	}

	if (bookmark.genres.length === 0) {
		// Default genres state is []
		return { field: "GENRES", message: "At least one genre is required." };
	}

	// Check valid values
	// Autocomplete enforces valid values for genres and tags
	// Select component enforces valid values for type
	// Rating component enforces valid values for rating
	// Image validation is done separately in BookmarkForm

	// Title length <= 200 enforced in onChange callback function in BookmarkForm
	if (!bookmark.title.trim()) {
		return {
			field: "TITLE",
			message: "Title cannot only contain whitespaces",
		};
	}

	// Genres length should be <= 5
	if (bookmark.genres.length > 5) {
		return {
			field: "GENRES",
			message: "Cannot have more than 5 genres",
		};
	}

	// Tags length should be <= 20
	if (bookmark.tags.length > 20) {
		return {
			field: "TAGS",
			message: "Cannot have more than 20 tags",
		};
	}

	return {};
}

function checkIfEmail(email) {
	const emailRegExp =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
	return emailRegExp.test(email);
}

function checkValidUsername(username) {
	const regExp = /^[a-z0-9]+$/i;
	return regExp.test(username);
}

function checkValidPassword(password) {
	const regExp =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return regExp.test(password);
}

export function validateSignUp(user) {
	if (!checkIfEmail(user.email)) {
		return {
			field: "EMAIL",
			message: "Please enter a valid email.",
		};
	}

	if (user.username.length < 4) {
		return {
			field: "USERNAME",
			message: "Username must have at least 4 characters.",
		};
	}

	if (!checkValidUsername(user.username)) {
		return {
			field: "USERNAME",
			message: "Username must only contain alphanumeric characters.",
		};
	}

	if (!checkValidPassword(user.password)) {
		return {
			field: "PASSWORD",
			message:
				"Password must contain at least eight characters, with minimum one uppercase letter, one lower case letter, a number and special character.",
		};
	}

	return {};
}
