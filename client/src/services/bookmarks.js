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
