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

export async function getBookmark(id) {
	const res = await axiosInstance.get(`bookmarks/${id}`);
	return res.data;
}

export async function editBookmark(data, id) {
	const formData = new FormData();
	for (const key in data) {
		formData.append(key, data[key]);
	}

	const res = await axiosInstance.put(`bookmarks/${id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return res.data;
}

export async function deleteBookmark(id) {
	const res = await axiosInstance.delete(`bookmarks/${id}`);
	return res.data;
}

export async function favoriteBookmark(id) {
	const res = await axiosInstance.put(`bookmarks/favorite/${id}`);
	return res.data;
}
