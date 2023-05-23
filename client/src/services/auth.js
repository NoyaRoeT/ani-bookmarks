export async function checkAuth() {
	try {
		const response = await fetch("http://localhost:6001/auth/checkAuth", {
			credentials: "include",
			withCredentials: true,
		});
		const resData = await response.json();
		return !resData.error;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export async function login(body) {
	try {
		const response = await fetch("http://localhost:6001/auth/login", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			withCredentials: true,
		});
		const resData = await response.json();
		return !resData.error;
	} catch (err) {
		console.log(err);
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
		console.log(err);
		return false;
	}
}
