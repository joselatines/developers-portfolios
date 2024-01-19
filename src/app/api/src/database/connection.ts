import { envVariables } from "@/app/lib/env";
import { Sequelize } from "sequelize";

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = envVariables;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	logging: false,
	host: DB_HOST,
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
