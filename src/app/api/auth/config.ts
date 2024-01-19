import { envVariables } from "@/app/lib/env";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
const { NEXT_PUBLIC_GITHUB_ID, NEXT_PUBLIC_GITHUB_SECRET } = envVariables;

export const authOptions: NextAuthOptions = {
	providers: [
		GitHubProvider({
			clientId: NEXT_PUBLIC_GITHUB_ID,
			clientSecret: NEXT_PUBLIC_GITHUB_SECRET,
		}),
	],
};
