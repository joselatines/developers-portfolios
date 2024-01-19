import axios, { AxiosResponse } from "axios";
import { API_URL, TOKEN_KEY_LOCAL_STORAGE } from "../CONST";
import { getValueFromLocalStorage } from "../contexts/auth/helper";

export const deleteComment = async (
	commentId: string
): Promise<AxiosResponse> => {
	const res = await axios.delete(`${API_URL}/portfolios/comments/${commentId}`);
	return res;
};
export const getComments = async (
	portfolioId: string
): Promise<AxiosResponse> => {
	const token = getValueFromLocalStorage(TOKEN_KEY_LOCAL_STORAGE);

	if (!token) {
		const res = await axios.get(
			`${API_URL}/portfolios/comments/${portfolioId}`
		);

		return res;
	}

	const options = {
		headers: { Authorization: `Bearer ${token}` },
	};

	const res = await axios.get(
		`${API_URL}/portfolios/comments/${portfolioId}`,
		options
	);
	return res;
};
