import React, { createContext, useState } from "react";

export const AuthContext = createContext({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
});

export const AuthContextProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};
