import { envVariables } from "@/app/lib/env";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const {
	NEXT_PUBLIC_TYPE,
	NEXT_PUBLIC_PROJECT_ID,
	NEXT_PUBLIC_PRIVATE_KEY_ID,
	NEXT_PUBLIC_PRIVATE_KEY,
	NEXT_PUBLIC_CLIENT_ID,
	NEXT_PUBLIC_AUTH_URI,
	NEXT_PUBLIC_TOKEN_URI,
	NEXT_PUBLIC_CLIENT_EMAIL,
	NEXT_PUBLIC_AUTH_PROVIDER_X509_CERT_URL,
	NEXT_PUBLIC_CLIENT_X509_CERT_URL,
	NEXT_PUBLIC_UNIVERSE_DOMAIN,
	NEXT_PUBLIC_STORAGEBUCKET,
} = envVariables;

const firebaseConfig = {
	type: NEXT_PUBLIC_TYPE,
	project_id: NEXT_PUBLIC_PROJECT_ID,
	private_key_id: NEXT_PUBLIC_PRIVATE_KEY_ID,
	private_key: NEXT_PUBLIC_PRIVATE_KEY,
	client_email: NEXT_PUBLIC_CLIENT_EMAIL,
	client_id: NEXT_PUBLIC_CLIENT_ID,
	auth_uri: NEXT_PUBLIC_AUTH_URI,
	token_uri: NEXT_PUBLIC_TOKEN_URI,

	auth_provider_x509_cert_url: NEXT_PUBLIC_AUTH_PROVIDER_X509_CERT_URL,
	client_x509_cert_url: NEXT_PUBLIC_CLIENT_X509_CERT_URL,
	universe_domain: NEXT_PUBLIC_UNIVERSE_DOMAIN,
	storageBucket: NEXT_PUBLIC_STORAGEBUCKET,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
