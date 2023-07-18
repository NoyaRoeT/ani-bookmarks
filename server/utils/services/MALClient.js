import axios from "axios";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

const BASE_URL = "https://api.myanimelist.net/v2/";

const MALClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		"X-MAL-CLIENT-ID": process.env.X_MAL_CLIENT_ID,
	},
});

export default MALClient;
