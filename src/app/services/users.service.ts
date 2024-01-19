import axios, { AxiosResponse } from "axios";
import { API_URL } from "../CONST";
import { IUser } from "../shared/interfaces/user.interface";

export const getLoggedUserProfile = async (
	token: string
): Promise<AxiosResponse> => {
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	const res = await axios.get(`${API_URL}/profiles/me`, config);
	return res;
};

export const editUser = async (
	editData: Partial<IUser>,
	id: string
): Promise<AxiosResponse> => {
	const res = await axios.put(`${API_URL}/users/${id}`, editData);
	return res;
};
