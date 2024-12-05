import { API_URL } from "@/const";
import { User } from "@/types/user";

export async function getUsers({ id }: { id: string }) {
	const res = await fetch(`${API_URL}/users?id=${id}`, { cache: "no-store" });

	return await res.json();
}

export async function updateUser(id: string, newData: Partial<User>) {
	const res = await fetch(`${API_URL}/users?id=${id}`, {
		method: "PATCH",
		body: JSON.stringify(newData),
	});

	return await res.json();
}
