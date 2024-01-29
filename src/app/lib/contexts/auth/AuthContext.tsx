"use client";
import { createContext, useState } from "react";
import { IAuthProviderProps, IAuthContext, IUserContext } from "./types";

const AuthContext = createContext<IAuthContext>({
	user: null,
	setUser: () => {},
	setToken: () => {},
	token: null,
});

const AuthProvider = ({ children }: IAuthProviderProps) => {
	const [user, setUser] = useState<IUserContext | null>(null);
	const [token, setToken] = useState<string | null>(null);

	return (
		<AuthContext.Provider value={{ user, setUser, token, setToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
