import { Model } from "sequelize";

const { ADMIN_ROLE } = process.env;

export const PORTFOLIO_TYPES = {
	backend: "backend",
	frontend: "frontend",
	fullstack: "fullstack",
	mobile: "mobile",
	software: "software",
} as const;

export type IPortfolioType = keyof typeof PORTFOLIO_TYPES;

export interface PortfolioDocument extends Model {
	thumbnail: string;
	created_by: number;
	website_link: string;
	type: IPortfolioType;
	title: string;
	description?: string;
	id: string;
	file_name: string;
}

export interface UserDocument {
	githubUsername: string;
	email: string;
	password: string;
	role: typeof ADMIN_ROLE | "user";
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
