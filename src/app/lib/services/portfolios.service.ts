import { CreatePortfolio } from "../types";
import { Response } from "./types";

export const createPortfolio = async (
	portfolio: CreatePortfolio
): Promise<Response> => {
	const res = await fetch(`/api/portfolios`, {
		method: "POST",
		body: JSON.stringify(portfolio),
	});

	const data = await res.json();

	if (!data.success) throw new Error(data.message);

	return data;
};

export async function getAllPortfolios() {
	const res = await fetch("http://localhost:3000/api/portfolios");

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export async function getPortfolio(id: string) {
	const res = await fetch(`http://localhost:3000/api/portfolios?id=${id}`);

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return await res.json();
}

export const editPortfolio = async (
	id: string,
	portfolio: Partial<CreatePortfolio>
): Promise<Response> => {
	const res = await fetch(`/api/portfolios?id=${id}`, {
		method: "PUT",
		body: JSON.stringify(portfolio),
	});

	const data = await res.json();

	if (!data.success) throw new Error(data.message);

	return data;
};

/* class ApiRequest {
	API_URL = process.env.API_URL;
	constructor() {}
	async getAllP() {
		const res = await fetch("http://localhost:3000/api/portfolios");

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		return res.json();
	}
} */
