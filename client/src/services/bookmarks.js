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
	try {
		const response = await fetch("http://localhost:6001/bookmarks", {
			method: "POST",
			body: formData,
			credentials: "include",
			withCredentials: true,
		});
		const { error } = await response.json();
		return !error;
	} catch (err) {
		console.error(err);
		return false;
	}
}

export async function editBookmark(data) {
	const formData = new FormData();
	formData.append("title", data.title);
	formData.append("genres", data.genres);
	formData.append("type", data.type);
	formData.append("image", data.image);
	try {
		const response = await fetch(
			`http://localhost:6001/bookmarks${data.id}`,
			{
				method: "PUT",
				body: formData,
				credentials: "include",
				withCredentials: true,
			}
		);
		const { error } = await response.json();
		return !error;
	} catch (err) {
		console.error(err);
		return false;
	}
}
