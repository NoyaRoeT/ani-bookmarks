import React, { useState } from "react";

export const AuthContext = React.createContext({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
});

const AuthContextProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	return (
		<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
