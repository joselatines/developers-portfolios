import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginConfig } from "./config";
import InputFields from "../InputFields";
import { loginWithEmail } from "../../../services/auth.service";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import useCustomToast from "../../../hooks/useCustomToast";

function LoginForm() {
	const { validationSchema, initialValues, fields } = loginConfig;
	const { setUser, setToken } = useContext(AuthContext);
	const navigate = useNavigate();
	const { handleToastSuccess, handleToastError, handleToastInfo } =
		useCustomToast();

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async values => {
			try {
				const res = await loginWithEmail(values);

				if (!res.data.success) {
					setUser(null);
					return handleToastError(res.data.message, "Authentication");
				}

				setUser(res.data.data.user);
				setToken(res.data.data.token);
				handleToastSuccess(res.data.message, "Authentication");

				navigate("/");
			} catch (error: any) {
				handleToastError(error.message);
			}
		},
	});

	const handleGitHubLogin = async () => {
		handleToastInfo("This option is temporary disabled");
		return
		/* const auth = getAuth();
		const provider = new GithubAuthProvider();

		try {
			const result = await signInWithPopup(auth, provider);

			// This gives you a GitHub Access Token. You can use it to access the GitHub API.
			const credential = GithubAuthProvider.credentialFromResult(result);

			if (!credential) throw new Error("Credentials is not presented");

			const token = credential.accessToken;

			// The signed-in user info.
			const user = result.user;
			// IdP data available using getAdditionalUserInfo(result)
			// ...

			// Handle GitHub login success, e.g., update UI or perform additional actions.
		} catch (error: any) {
			// Handle GitHub login failure, e.g., display an error message.
			console.error(error);
		} */
	};

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<InputFields formik={formik} fields={fields} />

				<Button
					disabled={formik.isSubmitting}
					isLoading={formik.isSubmitting}
					loadingText="Logging, please wait"
					colorScheme="twitter"
					type="submit"
				>
					Login
				</Button>
			</form>
			<Button
				mt={4}
				colorScheme="gray"
				onClick={handleGitHubLogin}
				/* isLoading={formik.isSubmitting} */
				loadingText="Logging with GitHub, please wait"
			>
				Login with GitHub
			</Button>
		</div>
	);
}

export default LoginForm;
