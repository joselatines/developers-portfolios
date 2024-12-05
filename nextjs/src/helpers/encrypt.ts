import bcrypt from "bcrypt";
export async function hashPassword(plainPassword: string, saltRounds = 10) {
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(plainPassword, salt);

	return hashedPassword;
}

export async function checkPassword(
	plainPassword: string,
	hashedPassword: string
) {
	return await bcrypt.compare(plainPassword, hashedPassword);
}
