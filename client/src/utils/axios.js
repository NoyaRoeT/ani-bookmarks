import axios from "axios";

const BASE_URL = "http://localhost:6001/";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	credentials: "include",
	withCredentials: true,
});

export default axiosInstance;
