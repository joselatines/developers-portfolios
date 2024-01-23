import { User } from "./user";

export interface Comment {
	id: string;
	comment: string;
	rating: number;
	portfolio_id: string;
	createdAt: string;
	updatedAt: string;
	User: User;
}
