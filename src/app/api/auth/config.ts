import { envVariables } from "@/app/lib/env";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
const { GITHUB_ID, GITHUB_SECRET } = process.env;

export const authOptions: NextAuthOptions = {
	providers: [
		GitHubProvider({
			clientId: GITHUB_ID as string,
			clientSecret: GITHUB_SECRET as string,
		}),
	],
};
