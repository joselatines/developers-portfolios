import { z } from "zod";

const envSchema = z.object({
	DB_USER: z.string(),
	DB_PASSWORD: z.string(),
	DB_NAME: z.string(),
	DB_HOST: z.string(),
	PORT: z.string(),
	JWT_SECRET: z.string(),
	PRODUCTION_URL: z.string(),
	GITHUB_SECRET: z.string(),
	GITHUB_ID: z.string(),
	TOKEN_KEY_LOCAL_STORAGE: z.string(),
	USER_KEY_LOCAL_STORAGE: z.string(),
	TYPE: z.string(),
	PROJECT_ID: z.string(),
	PRIVATE_KEY_ID: z.string(),
	PRIVATE_KEY: z.string(),
	CLIENT_EMAIL: z.string(),
	CLIENT_ID: z.string(),
	AUTH_URI: z.string(),
	TOKEN_URI: z.string(),
	AUTH_PROVIDER_X509_CERT_URL: z.string(),
	CLIENT_X509_CERT_URL: z.string(),
	UNIVERSE_DOMAIN: z.string(),
	STORAGEBUCKET: z.string(),
});

export const envVariables = envSchema.parse(process.env);
