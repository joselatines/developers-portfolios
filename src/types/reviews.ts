import { User } from "./user";

export interface CreateReview {
	comment: string;
	rating: number;
	portfolio_id: string;
}

export interface Review extends CreateReview {
	id: string;
	createdAt: string;
	updatedAt: string;
	user: User;
	comment: string;
	rating: number;
	portfolio_id: string;
	rated_by: string;
}
