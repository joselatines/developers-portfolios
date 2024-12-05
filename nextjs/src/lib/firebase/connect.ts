import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const {
	TYPE,
	PROJECT_ID,
	PRIVATE_KEY_ID,
	PRIVATE_KEY,
	CLIENT_ID,
	AUTH_URI,
	TOKEN_URI,
	CLIENT_EMAIL,
	AUTH_PROVIDER_X509_CERT_URL,
	CLIENT_X509_CERT_URL,
	UNIVERSE_DOMAIN,
	STORAGEBUCKET,
} = process.env;

const firebaseConfig = {
	type: TYPE,
	project_id: PROJECT_ID,
	private_key_id: PRIVATE_KEY_ID,
	private_key: PRIVATE_KEY,
	client_email: CLIENT_EMAIL,
	client_id: CLIENT_ID,
	auth_uri: AUTH_URI,
	token_uri: TOKEN_URI,

	auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
	client_x509_cert_url: CLIENT_X509_CERT_URL,
	universe_domain: UNIVERSE_DOMAIN,
	storageBucket: STORAGEBUCKET,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
