import { API_URL } from "@/const";
import { CreatePortfolio } from "@/types/portfolio";

export async function deletePortfolio(id: string) {
	const res = await fetch(`${API_URL}/portfolios?id=${id}`, {
		method: "DELETE",
	});

	return await res.json();
}

export async function createPortfolio(data: CreatePortfolio) {
	const res = await fetch(`${API_URL}/portfolios`, {
		method: "POST",
		body: JSON.stringify(data),
	});

	return await res.json();
}

export async function updatePortfolio(id: string, newData: CreatePortfolio) {
	const res = await fetch(`${API_URL}/portfolios?id=${id}`, {
		method: "PATCH",
		body: JSON.stringify(newData),
	});

	return await res.json();
}

export async function getPortfolios({ portfolioId, authorId }: Filters) {
	const queryParams = new URLSearchParams();

	if (portfolioId) {
		queryParams.append("portfolio", portfolioId);
	}

	if (authorId) {
		queryParams.append("author", authorId);
	}

	const res = await fetch(`${API_URL}/portfolios?${queryParams.toString()}`, {
		cache: "no-store",
	});

	return await res.json();
}
interface Filters {
	portfolioId?: string;
	authorId?: string;
}
