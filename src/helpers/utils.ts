import { Portfolio, PORTFOLIO_TYPES } from "@/types/portfolio";

const { backend, frontend, fullstack, mobile, software } = PORTFOLIO_TYPES;

// Determine rate color based on rating
export const getRateColor = (ratingNumber: number) => {
	let rateColor = ratingNumber > 5 ? "green" : "red"; // 7: green | 4: red
	rateColor = ratingNumber >= 5 && ratingNumber <= 7 ? "orange" : rateColor; // 5: orange
	return rateColor;
};

// Determine type color based on portfolio type
export const getTypeColor = (type: string) => {
	switch (type) {
		case backend:
			return "blue";
		case frontend:
			return "purple";
		case fullstack:
			return "cyan";
		case mobile:
			return "green";
		case software:
			return "yellow";
		default:
			return "gray";
	}
};

export const getUserProfileUrl = (userId: string): string => {
	return `/users/${userId}`;
};

export function sortPortfolios(portfolios: Portfolio[]): Portfolio[] {
	return portfolios.sort((a, b) => {
		// First, compare peopleRated in descending order
		if (a.peopleRated !== b.peopleRated) {
			return b.peopleRated - a.peopleRated;
		}
		// If peopleRated is the same, compare avgRating in descending order
		if (a.avgRating !== b.avgRating) {
			return b.avgRating - a.avgRating;
		}
		// If both peopleRated and avgRating are the same, compare updatedAt in descending order
		return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
	});
}

export function generateRandomUsername(){
	const now = new Date()
	return `user-${now.getTime().toString().slice(0, 10)}`
}
