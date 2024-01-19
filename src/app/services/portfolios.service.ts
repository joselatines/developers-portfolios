import { envVariables } from "../lib/env";

const { NEXT_PUBLIC_API_URL } = envVariables;

export const createPortfolio = async (bodyData: any): Promise<Response> => {
	const formData = new FormData();
	for (const key in bodyData) {
		formData.append(key, bodyData[key]);
	}

	const res = await fetch(`${NEXT_PUBLIC_API_URL}/portfolios`, {
		method: "POST",
		body: formData,
	});
	return res;
};

export const editPortfolio = async (
	bodyData: any,
	id: string
): Promise<Response> => {
	const formData = new FormData();
	for (const key in bodyData) {
		formData.append(key, bodyData[key]);
	}

	const res = await fetch(`${NEXT_PUBLIC_API_URL}/portfolios/${id}`, {
		method: "PUT",
		body: formData,
	});
	return res;
};

export const deletePortfolio = async (id: string): Promise<Response> => {
	const res = await fetch(`${NEXT_PUBLIC_API_URL}/portfolios/${id}`, {
		method: "DELETE",
	});
	return res;
};
