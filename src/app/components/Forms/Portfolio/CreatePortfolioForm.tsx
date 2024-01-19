import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { IImageState, createPortfolioConfig } from "./config";
import InputFields from "../InputFields";
import { ImageUploader } from "../ImageUploader";
import { createPortfolio } from "../../../services/portfolios.service";
import useCustomToast from "../../../hooks/useCustomToast";
import { redirect } from "next/navigation";

function CreatePortfolioForm() {
	const { validationSchema, initialValues, fields } = createPortfolioConfig;
	const [images, setImages] = useState<IImageState[]>([]);
	const { handleToastError, handleToastSuccess } = useCustomToast();

	const formik = useFormik({
		initialValues,
		validationSchema,

		onSubmit: async values => {
			const valuesParsed = { ...values, thumbnail: images[0].data_url };
			if (!values.thumbnail || values.thumbnail.length < 0)
				return alert("At least 1 image thumbnail is required");

			try {
				const res = await createPortfolio(valuesParsed);

				console.log(res);
				console.log(res.json());

				/* if (!res.)
					return handleToastError(res.data.message, "Creating portfolio");

				handleToastSuccess(res.data.message, "Creating portfolio");
				redirect("/profiles/me"); */
			} catch (error: any) {
				handleToastError(error.message);
			}
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<InputFields formik={formik} fields={fields} />

			<ImageUploader images={images} setImages={setImages} maxNumber={1} />
			<Button
				colorScheme="twitter"
				disabled={formik.isSubmitting}
				isLoading={formik.isSubmitting}
				loadingText="Creating portfolio..."
				type="submit"
			>
				Create portfolio
			</Button>
		</form>
	);
}

export default CreatePortfolioForm;
