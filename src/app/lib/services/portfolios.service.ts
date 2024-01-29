import { CreatePortfolio } from "@/app/lib/types/portfolio";
import { ParamsRequest, Response } from "./types";
import { API_URL } from "./config";

export const createPortfolio = async (
	portfolio: CreatePortfolio
): Promise<Response> => {
	const res = await fetch(`${API_URL}/portfolios`, {
		method: "POST",
		body: JSON.stringify(portfolio),
	});

	const data = await res.json();

	if (!data.success) throw new Error(data.message);

	return data;
};

export async function getAllPortfolios(params?: ParamsRequest) {
	const filterByUser = params?.userId ?? `?userId=${params?.userId}`;
	
	const res = await fetch(`${API_URL}/portfolios${filterByUser}`);

	const data = await res.json();
	if (!data.success) throw new Error(data.message);

	return data;
}

export async function getPortfolio(id: string) {
	const res = await fetch(`${API_URL}/portfolios?id=${id}`);

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return await res.json();
}

// TODO: MAKE SAME REQUEST AS CREATE PORTFOLIO

export const editPortfolio = async (
	id: string,
	portfolio: Partial<CreatePortfolio>
): Promise<Response> => {
	const res = await fetch(`${API_URL}/portfolios?id=${id}`, {
		method: "PUT",
		body: JSON.stringify(portfolio),
	});

	const data = await res.json();

	if (!data.success) throw new Error(data.message);

	return data;
};

export const deletePortfolio = async (id: string): Promise<Response> => {
	const res = await fetch(`${API_URL}/portfolios?id=${id}`, {
		method: "DELETE",
	});

	const data = await res.json();

	if (!data.success) throw new Error(data.message);

	return data;
};
