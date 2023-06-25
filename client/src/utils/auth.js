import axiosInstance from "./axios";

export async function checkAuth() {
	const res = await axiosInstance.get("auth/checkAuth");
	return res.data;
}

export async function login(body) {
	const res = await axiosInstance.post("auth/login", body);
	return res.data;
}

export async function signup(body) {
	const res = await axiosInstance.post("auth/register", body);
	return res.data;
}

export async function logout() {
	const res = await axiosInstance.post("auth/logout");
	return res.data;
}
