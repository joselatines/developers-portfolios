import { API_URL } from "@/const";
import { CreateReview } from "@/types/reviews";

export async function getReviews({ portfolio }: { portfolio: string }) {
	const res = await fetch(`${API_URL}/reviews?portfolio=${portfolio}`, {
		cache: "no-store",
	});

	return await res.json();
}

export async function deleteReview(id: string) {
	const res = await fetch(`${API_URL}/reviews?id=${id}`, {
		method: "DELETE",
	});

	return await res.json();
}

export const giveReview = async (
	portfolioId: string,
	body: CreateReview
): Promise<Response> => {
	const res = await fetch(`${API_URL}/reviews?portfolioId=${portfolioId}`, {
		method: "POST",
		body: JSON.stringify(body),
	});

	const data = await res.json();

	if (!data.success) throw new Error(data.message);

	return data;
};
