import { API_URL } from "@/const";
import { Review } from "@/types/reviews";

export async function getReviews({ portfolio }: { portfolio: string }) {
	const res = await fetch(`${API_URL}/reviews?portfolio=${portfolio}`, {
		cache: "no-store",
	});

	return await res.json();
}

export async function deleteReview(id: string) {
	alert("reviews not working");
}

export const giveReview = async (
	portfolioId: string,
	body: Review
): Promise<Response> => {
	const res = await fetch(
		`${API_URL}/ratings/portfolios?portfolioId=${portfolioId}`,
		{
			method: "POST",
			body: JSON.stringify(body),
		}
	);

	const data = await res.json();

	if (!data.success) throw new Error(data.message);

	return data;
};
