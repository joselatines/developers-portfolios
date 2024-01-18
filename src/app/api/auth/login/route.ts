import { generateJWT } from "../../src/utils/jwt";

export async function GET(request: Request) {
	return new Response("hi i am login");
}

export async function POST(request: Request) {
	const credentials = request.json();
	// Creating a JWT token
	const token = generateJWT({
		id: "database id",
		role: "database role",
		email: "user@user.com",
	});

	return Response.json({ token });
}
