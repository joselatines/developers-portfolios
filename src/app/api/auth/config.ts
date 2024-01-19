import { envVariables } from "@/app/lib/env";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
const { GITHUB_ID, GITHUB_SECRET } = envVariables;

export const authOptions: NextAuthOptions = {
	providers: [
		GitHubProvider({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET,
		}),
	],
};
