export async function checkAuth() {
	try {
		const response = await fetch("http://localhost:6001/auth/checkAuth", {
			credentials: "include",
			withCredentials: true,
		});
		const resData = await response.json();
		return !resData.error;
	} catch (err) {
		return false;
	}
}

export async function logout() {
	try {
		const response = await fetch("http://localhost:6001/auth/logout", {
			method: "POST",
			credentials: "include",
			withCredentials: true,
		});
		const resData = await response.json();
		return !resData.error;
	} catch (err) {
		return false;
	}
}
