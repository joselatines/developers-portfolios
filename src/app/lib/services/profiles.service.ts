import { API_URL } from "./config";

export async function getProfile(id: string) {
	const res = await fetch(`${API_URL}/profiles?userId=${id}`);

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return await res.json();
}
