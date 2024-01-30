import { CreateRating } from "@/app/lib/types/comment";
import { ParamsRequest, Response } from "./types";
import { API_URL } from "./config";

export const giveRatingToPortfolio = async (
	id: string,
	ratingBody: CreateRating
): Promise<Response> => {
	const res = await fetch(`${API_URL}/ratings/portfolios?portfolioId=${id}`, {
		method: "POST",
		body: JSON.stringify(ratingBody),
	});

	const data = await res.json();

	if (!data.success) throw new Error(data.message);

	return data;
};

export async function getAllRatingsFromAPortfolio({
	portfolioId,
}: ParamsRequest) {
	const res = await fetch(
		`${API_URL}/ratings/portfolios?portfolioId=${portfolioId}`
	);

	const data = await res.json();
	if (!data.success) throw new Error(data.message);

	return data;
}

export async function deleteRating(id: string) {
	const res = await fetch(`${API_URL}/ratings?id=${id}`, {
		method: "DELETE",
	});

	const data = await res.json();
	if (!data.success) throw new Error(data.message);

	return data;
}
