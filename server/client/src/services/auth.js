import { BASE_URL } from "./constants";
export async function checkAuth() {
	try {
		const response = await fetch(`${BASE_URL}/auth/checkAuth`, {
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

export async function signup(body) {
	try {
		const response = await fetch(`${BASE_URL}/auth/register`, {
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

export async function login(body) {
	try {
		const response = await fetch(`${BASE_URL}/auth/login`, {
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
		const response = await fetch(`${BASE_URL}/auth/logout`, {
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
