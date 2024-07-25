import { API_URL } from "@/const";

export async function getUsers({ id }: { id: string }) {
	const res = await fetch(`${API_URL}/users?id=${id}`, { cache: "no-store" });

	return await res.json();
}
