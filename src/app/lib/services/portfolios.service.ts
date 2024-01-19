import { CreatePortfolio } from "../types";
import { Response } from "./types";

export const createPortfolio = async (
	portfolio: CreatePortfolio
): Promise<Response> => {
	/* 	const formData = new FormData();
	for (const key in bodyData) {
		formData.append(key, bodyData[key]);
	}
 */

	const res = await fetch(`/api/portfolios`, {
		method: "POST",
		body: JSON.stringify(portfolio),
	});

	if (!res.ok) throw new Error("Failed to create portfolio");

	return { success: true, message: "Portfolio created" };
};

export async function getAllPortfolios() {
	const res = await fetch("http://localhost:3000/api/portfolios");

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}
