import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const JWT_SECRET_ = JWT_SECRET || "";
interface IData {
	id: string;
	role: string;
	email: string;
}

export function generateJWT(secretData: IData, expiresIn = "48h"): string {
	return jwt.sign(secretData, JWT_SECRET_, {
		expiresIn,
	});
}

export function verifyToken(token: string) {
	try {
		const decoded = jwt.verify(token, JWT_SECRET_);
		return decoded; // {role: example123, id: example123}
	} catch (error) {
		console.error(error);
		return null;
	}
}

export function getUserFromToken(authHeader: string) {
	// authHeader: Bearer a4sdf68a4sf68a4s6df4a6s4df6
	const token = authHeader.split(" ")[1];

	return verifyToken(token);
}
