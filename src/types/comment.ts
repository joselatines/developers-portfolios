import { User } from "./user";

export interface CreateRating {
	comment: string;
	rating: number;
	portfolio_id: string;
}

export interface Comment extends CreateRating {
	id: string;
	createdAt: string;
	updatedAt: string;
	user: User;
	comment: string;
	rating: 3;
	portfolio_id: string;
	rated_by: string;
}
