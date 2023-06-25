import axiosInstance from "./axios";

export async function searchBookmarks(query) {
	const res = await axiosInstance.post("bookmarks/search", query);
	return res.data;
}

export async function getGenres() {
	const res = await axiosInstance.get("bookmarks/genres");
	return res.data;
}

export async function getTags() {
	const res = await axiosInstance.get("bookmarks/tags");
	return res.data;
}

export async function addBookmark(data) {
	const formData = new FormData();
	for (const key in data) {
		formData.append(key, data[key]);
	}
	const res = await axiosInstance.post("bookmarks", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return res.data;
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
