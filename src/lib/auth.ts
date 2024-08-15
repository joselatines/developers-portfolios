import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession, NextAuthOptions } from "next-auth";
import { prisma } from "@/database";
import { checkPassword, hashPassword } from "@/helpers/encrypt";
import { redirect } from "next/navigation";
import { generateRandomUsername } from "@/helpers/utils";

const { GITHUB_ID, GITHUB_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } =
	process.env;

export const authConfig: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Sign in with email",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "jsmith@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};
				const existingUser = await prisma.users.findFirst({
					where: { email },
				});

				// If the user doesn't exist, create a new user in the database
				if (!existingUser) {
					const newUser = await prisma.users.create({
						data: {
							email,
							password: await hashPassword(password),
							provider: null,
							username: generateRandomUsername(),
						},
					});

					return newUser;
				}

				if (!existingUser.password) {
					const userEdited = await prisma.users.update({
						where: {
							id: existingUser.id,
						},
						data: {
							password: await hashPassword(password),
						},
					});

					return userEdited;
				}

				const correctPsw = await checkPassword(password, existingUser.password);

				return correctPsw ? existingUser : null;
			},
		}),
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
		async signIn(body) {
			const { user, account, profile } = body;

			if (account?.provider.includes("credentials")) return true;

			if (!profile || !account || !user) {
				console.error(
					"params not presented in request check your auth provider"
				);
				return false;
			}

			const userEmail = profile.email as string;
			const profilePic = profile.image || user.image;
			const username = profile.name;
			const provider = account.provider;
			const githubUsername = provider === "github" ? profile.name : null;

			try {
				// Check if the user already exists in the database
				const existingUser = await prisma.users.findFirst({
					where: { email: userEmail },
				});

				// If the user doesn't exist, create a new user in the database
				if (!existingUser) {
					await prisma.users.create({
						data: {
							email: userEmail,
							username,
							githubUsername,
							profilePic,
							provider,
						},
					});
				}
			} catch (error) {
				console.error("Error during sign-in callback:", error);
				return false; // Stop the sign-in process due to an error
			}

			return true; // Continue the sign-in process
		},
		async session({ session, token, user }: any) {
			const userDb = await prisma.users.findFirst({
				where: { email: session.user.email },
			});

			if (userDb) {
				// TODO: session.user.name = userDb.username;
				session.user.image = userDb.profilePic;
				session.user.id = userDb.id;
			}

			console.info({ session });
			return session;
		},
	},
};

export async function loginIsRequiredServer(redirectRoute = "/") {
	const session = await getServerSession(authConfig);
	if (!session) return redirect(redirectRoute);
}
