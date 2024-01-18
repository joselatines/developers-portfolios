"use client";

const { TOKEN_NAME } = process.env;

export default function Login() {
	const handleReq = async () => {
		const res = await fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify({ email: "test@gmail.com" }),
		});

		const body = await res.json();

		localStorage.setItem(TOKEN_NAME || "d", body.token);
	};

	const handleReq2 = async () => {
		const token = localStorage.getItem(TOKEN_NAME || "d");
		const res = await fetch("/api/portfolios", {
			headers: { Authorization: `Bearer ${token}` },
		});

		const body = await res.json();

		console.log(body);
	};
	return <button onClick={handleReq}>Make call</button>;
}
