export interface User {
	id: string;
	githubUsername: string;
	email: string;
	profilePic: string;
	provider: string | null;
	username: string;
	password: string;
}
