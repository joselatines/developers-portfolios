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
