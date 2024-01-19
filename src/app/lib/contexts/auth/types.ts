import { ReactNode } from "react";

export const ROLES = {
	user: "user",
	admin: "admin",
} as const;

export type IRoles = keyof typeof ROLES;

export interface IUserContext {
	id: string;
	githubUsername: string;
	email: string;
	role: IRoles;
	token: string;
	expiresAt: string; // "2023-12-09T02:06:36.677Z"
	profilePic: string;
	provider: string | "github" | "google" | "twitter";
}

export interface IAuthContext {
	user: IUserContext | null;
	setUser: (value: IUserContext | null) => void;
	token: string | null;
	setToken: (value: string | null) => void;
}

export interface IAuthProviderProps {
	children: ReactNode;
}
