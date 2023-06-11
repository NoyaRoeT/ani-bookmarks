import { BASE_URL } from "./constants";
export async function fetchBookmarks() {
	try {
		const response = await fetch(`${BASE_URL}/bookmarks`, {
			credentials: "include",
			withCredentials: true,
		});
		const resData = await response.json();
		return resData;
	} catch (err) {
		console.log(err);
		return { error: { message: err.message } };
	}
}

export async function addBookmark(data) {
	const formData = new FormData();
	for (const key in data) {
		formData.append(key, data[key]);
	}
	try {
		const response = await fetch(`${BASE_URL}/bookmarks`, {
			method: "POST",
			body: formData,
			credentials: "include",
			withCredentials: true,
		});
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(err);
		return { error: { message: err.message } };
	}
}

export async function deleteBookmark(id) {
	try {
		const response = await fetch(`${BASE_URL}/bookmarks/${id}`, {
			method: "DELETE",
			credentials: "include",
			withCredentials: true,
		});
		const resData = await response.json();
		return resData;
	} catch (err) {
		console.log(err);
		return { error: { message: err.message } };
	}
}

export async function editBookmark(data, id) {
	const formData = new FormData();
	for (const key in data) {
		formData.append(key, data[key]);
	}
	try {
		const response = await fetch(`${BASE_URL}/bookmarks/${id}`, {
			method: "PUT",
			body: formData,
			credentials: "include",
			withCredentials: true,
		});
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(err);
		return { error: { message: err.message } };
	}
}

export async function fetchGenresAndTags() {
	try {
		const response = await fetch(`${BASE_URL}/bookmarks/genresandtags`, {
			credentials: "include",
			withCredentials: true,
		});
		const resData = await response.json();
		return resData;
	} catch (err) {
		console.log(err);
		return { error: { message: err.message } };
	}
}

export async function searchBookmarks(query) {
	try {
		const response = await fetch(`${BASE_URL}/bookmarks/search`, {
			method: "POST",
			body: JSON.stringify(query),
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			withCredentials: true,
		});
		const resData = await response.json();
		return resData;
	} catch (err) {
		console.log(err);
		return { error: { message: err.message } };
	}
}
