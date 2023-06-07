// Returns error information if there is an error, else returns null
export function validateBookmark(bookmark) {
	// Check required fields
	if (!bookmark.title) {
		return { field: "title", message: "Title is a required field." };
	}

	if (!bookmark.genres || bookmark.genres.length === 0) {
		return { field: "genres", message: "At least one genre is required." };
	}

	if (!bookmark.type) {
		return { field: "type", message: "A type is required." };
	}

	// Check valid values
	// ComboBox's MUI Autocomplete component enforces valid values for genres and tags
	// Select component enforces valid values for type
	// Image url can be any string

	// titleRegex test takes care of disallowing empty string
	const titleRegex = /^[a-z0-9 "'!?,.]+$/i;
	if (!titleRegex.test(bookmark.title) || bookmark.title.length > 200) {
		return {
			field: "title",
			message: `Title may only contain alphanumeric characters, whitespaces, ",", ".", "!", "?", "'".`,
		};
	}

	if (bookmark.image) {
		const sizeLimit = 1024 * 1024;
		if (!bookmark.image.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
			return {
				field: "image",
				message:
					"Uploaded images must have one of these extensions: .jpg, .jpeg, .png, .gif",
			};
		}
		if (bookmark.image.size > sizeLimit) {
			return {
				field: "image",
				message: `Uploaded images must be smaller than ${sizeLimit} bytes`,
			};
		}
	}
	return null;
}
