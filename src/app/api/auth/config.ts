import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

import { UsersController } from "../src/controllers/users";
const { GITHUB_ID, GITHUB_SECRET, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } =
	process.env;
import { UsersModel } from "../src/models/users";

const model = new UsersModel();
const controller = new UsersController(model);

export const authOptions: NextAuthOptions = {
	providers: [
		GitHubProvider({
			clientId: GITHUB_ID as string,
			clientSecret: GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID as string,
			clientSecret: GOOGLE_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		async signIn(params) {
			const { user, account, profile } = params;

			if (!profile || !account || !user) {
				console.error(
					"params not presented in request check your auth provider"
				);
				return false;
			}

			const email = profile.email as string;
			const profilePic = profile.image || user.image;
			const githubUsername = profile.name;
			const provider = account.provider;

			if (email === "admin@tpeoficial.com") return false;

			try {
				// check if the user already exists in the database
				const existingUser = await controller.getByKey("email", email);

				// if the user doesn't exist, create a new user in the database
				if (!existingUser.success) {
					await controller.create({
						email,
						githubUsername,
						profilePic,
						provider,
					});
				}
			} catch (error) {
				console.error("Error during sign-in callback:", error);
				return false; // Stop the sign-in process due to an error
			}

			return true; // Continue the sign-in process
		},
	},
};
