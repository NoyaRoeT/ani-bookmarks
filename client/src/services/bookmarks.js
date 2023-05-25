export async function fetchBookmarks() {
	try {
		const response = await fetch("http://localhost:6001/bookmarks", {
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
	formData.append("title", data.title);
	formData.append("genres", data.genres);
	formData.append("type", data.type);
	formData.append("image", data.image);
	formData.append("tags", data.tags);
	try {
		const response = await fetch("http://localhost:6001/bookmarks", {
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
		const response = await fetch(`http://localhost:6001/bookmarks/${id}`, {
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

export async function editBookmark(data) {
	const formData = new FormData();
	formData.append("title", data.title);
	formData.append("genres", data.genres);
	formData.append("type", data.type);
	formData.append("image", data.image);
	formData.append("tags", data.tags);
	try {
		const response = await fetch(
			`http://localhost:6001/bookmarks/${data.id}`,
			{
				method: "PUT",
				body: formData,
				credentials: "include",
				withCredentials: true,
			}
		);
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(err);
		return { error: { message: err.message } };
	}
}

export async function fetchGenresAndTags() {
	try {
		const response = await fetch(
			"http://localhost:6001/bookmarks/genresandtags",
			{
				credentials: "include",
				withCredentials: true,
			}
		);
		const resData = await response.json();
		return resData;
	} catch (err) {
		console.log(err);
		return { error: { message: err.message } };
	}
}
