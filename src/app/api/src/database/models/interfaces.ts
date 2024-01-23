import { Model } from "sequelize";

const { NEXT_PUBLIC_ADMIN_ROLE } = process.env;

export const PORTFOLIO_TYPES = {
	backend: "backend",
	frontend: "frontend",
	fullstack: "fullstack",
	mobile: "mobile",
	software: "software",
} as const;

export type PortfolioType = keyof typeof PORTFOLIO_TYPES;

export interface PortfolioDocument extends Model {
	thumbnail: string;
	created_by: string;
	website_link: string;
	type: PortfolioType;
	title: string;
	description?: string;
	id: string;
	file_name: string;
}

export interface UserDocument {
	githubUsername: string;
	email: string;
	password: string;
	role: typeof NEXT_PUBLIC_ADMIN_ROLE | "user";
	id: string;
	github: string;
	profilePic: string;
	provider: string;
}

export interface RatingsDocument {
	rating: number;
	portfolio_id: number;
	rated_by: number;
	comment?: string;
}
