import { User } from "./user";

export interface CreatePortfolio {
	thumbnail: string;
	websdite_link: string;
	github_link: string;
	title: string;
	description: string;
	type: PortfolioType;
	file_name: string;
}
export interface Portfolio extends CreatePortfolio {
	id: string;
	avgRating: number;
	peopleRated: number;
	user: User;
	updatedAt: string;
	createdAt: string;
	created_by: string;
}

export const PORTFOLIO_TYPES = {
	backend: "backend",
	frontend: "frontend",
	fullstack: "fullstack",
	mobile: "mobile",
	software: "software",
} as const;

export interface PortfolioFilters {
	title: string;
	type: PortfolioType;
	date: "desc" | "asc";
	author: string;
}

export type PortfolioType = keyof typeof PORTFOLIO_TYPES;
