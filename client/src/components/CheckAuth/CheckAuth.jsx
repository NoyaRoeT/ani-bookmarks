import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { checkAuth } from "../../utils/auth";

const CheckAuth = () => {
	const authContext = useContext(AuthContext);

	useEffect(() => {
		async function requestAuthDetails() {
			try {
				const res = await checkAuth();
				authContext.setUser(res.data);
			} catch (err) {
				console.log(err.response.data);
				authContext.setUser(null);
			}
		}
		requestAuthDetails();
	}, []);
};

export default CheckAuth;
