import { Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { signUpConfig } from "./config";
import InputFields from "../InputFields";
import { signUpWithEmail } from "../../../services/auth.service";
import useCustomToast from "../../../hooks/useCustomToast";

function SignUpForm() {
	const { validationSchema, initialValues, fields } = signUpConfig;
	const navigate = useNavigate();
	const { handleToastSuccess, handleToastError } = useCustomToast();

	const formik = useFormik({
		initialValues,
		validationSchema,

		onSubmit: async values => {
			try {
				const res = await signUpWithEmail(values);

				if (!res.data.success)
					return handleToastError(res.data.message, "Authentication");

				handleToastSuccess(res.data.message, "Authentication");
				navigate("/auth/login");
			} catch (error: any) {
				handleToastError(error.message);
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<InputFields formik={formik} fields={fields} />

			<Button
				disabled={formik.isSubmitting}
				isLoading={formik.isSubmitting}
				loadingText="Signing up..."
				colorScheme="twitter"
				type="submit"
			>
				Sign up
			</Button>
		</form>
	);
}

export default SignUpForm;
