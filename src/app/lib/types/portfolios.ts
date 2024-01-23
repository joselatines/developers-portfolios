export interface Portfolio {
	thumbnail: string;
	created_by: string;
	website_link: string;
	type: PortfolioType;
	title: string;
	description: string;
	id: string;
	file_name: string;
	avgRating: number;
	github_link: string;
}
export interface CreatePortfolio {
	description: string;
	github_link: string;
	thumbnail: string;
	title: string;
	type: PortfolioType;
	website_link: string;
}

export const PORTFOLIO_TYPES = {
	backend: "backend",
	frontend: "frontend",
	fullstack: "fullstack",
	mobile: "mobile",
	software: "software",
} as const;

export type PortfolioType = keyof typeof PORTFOLIO_TYPES;
