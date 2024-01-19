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
