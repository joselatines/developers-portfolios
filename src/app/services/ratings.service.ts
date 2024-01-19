import axios, { AxiosResponse } from "axios";
import { API_URL, TOKEN_KEY_LOCAL_STORAGE } from "../CONST";
import { CreateRating } from "../shared/interfaces/ratings.interface";
import { getValueFromLocalStorage } from "../contexts/auth/helper";
import { AUTH_MSG } from "./config";

export const createRatingToPortfolio = async (
	body: CreateRating
): Promise<AxiosResponse> => {
	const token = getValueFromLocalStorage(TOKEN_KEY_LOCAL_STORAGE);

	if (!token) throw new Error(AUTH_MSG);

	const options = {
		headers: { Authorization: `Bearer ${token}` },
	};

	const res = await axios.post(`${API_URL}/portfolios/ratings`, body, options);
	return res;
};
