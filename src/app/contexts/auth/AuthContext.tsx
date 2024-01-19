"use client";
import { createContext, useState } from "react";
import { IAuthProviderProps, IAuthContext, IUserContext } from "./types";
import { getValueFromLocalStorage, saveInLocalStorage } from "./helper";
import { envVariables } from "@/app/lib/env";
const { TOKEN_KEY_LOCAL_STORAGE, USER_KEY_LOCAL_STORAGE } = envVariables;

const AuthContext = createContext<IAuthContext>({
	user: null,
	setUser: () => {},
	setToken: () => {},
	token: null,
});

const AuthProvider = ({ children }: IAuthProviderProps) => {
	const [user, setUser] = useState<IUserContext | null>(
		getValueFromLocalStorage(USER_KEY_LOCAL_STORAGE)
	);
	const [token, setToken] = useState<string | null>(
		getValueFromLocalStorage(TOKEN_KEY_LOCAL_STORAGE)
	);

	const handleSetUser = (value: IUserContext | null) => {
		if (value) {
			console.info("data saved in localStorage and context");
			saveInLocalStorage(USER_KEY_LOCAL_STORAGE, value);
		} else {
			localStorage.removeItem(USER_KEY_LOCAL_STORAGE);
			console.info("data removed in localStorage and context");
		}
		setUser(value);
	};

	const handleSetToken = (value: string | null) => {
		if (value) {
			console.info("data saved in localStorage and context");
			saveInLocalStorage(TOKEN_KEY_LOCAL_STORAGE, value);
		} else {
			localStorage.removeItem(TOKEN_KEY_LOCAL_STORAGE);
			console.info("data removed in localStorage and context");
		}
		setToken(value);
	};

	return (
		<AuthContext.Provider
			value={{ user, setUser: handleSetUser, token, setToken: handleSetToken }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
