export interface Props {
	isLoggedIn: boolean;
	user:
		| { name: string; image: string; id: string; email: string }
		| undefined
		| null;
}
