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
