import { envVariables } from "@/app/lib/env";
import { Sequelize } from "sequelize";

const { NEXT_PUBLIC_DB_HOST, NEXT_PUBLIC_DB_NAME, NEXT_PUBLIC_DB_USER, NEXT_PUBLIC_DB_PASSWORD } = envVariables;

export const sequelize = new Sequelize(NEXT_PUBLIC_DB_NAME, NEXT_PUBLIC_DB_USER, NEXT_PUBLIC_DB_PASSWORD, {
	host: NEXT_PUBLIC_DB_HOST,
	dialect: "mysql",
	dialectModule: require("mysql2"),
});

export async function connectDB() {
	try {
		console.info("trying to connect DB...");
		await sequelize.authenticate();
		await sequelize.sync();

		console.info("✨ db sequelize connected successfully");
	} catch (error) {
		console.error("an error occurred while trying to connect to db");
		console.error(error);
	}
}

export async function clearDB() {
	try {
		console.info("clearing tables...");
		// await User.truncate();
		console.info("tables cleared");
	} catch (error) {
		console.error("an error occurred while trying to clear db tables");
		console.error(error);
	}
}

export async function closeDB() {
	try {
		console.info("closing db");
		await sequelize.close();
		console.info("dn is closed");
	} catch (error) {
		console.info("an error occurred while trying to close db");
		console.error(error);
	}
}
