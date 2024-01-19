import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { editPortfolio } from "../../../services/portfolios.service";

import { IImageState, IInitialValues, createPortfolioConfig } from "./config";
import InputFields from "../InputFields";
import { ImageUploader } from "../ImageUploader";
import useCustomToast from "../../../hooks/useCustomToast";

function EditPortfolioForm({ initialValues, portfolioId }: IProps) {
	const { validationSchema, fields } = createPortfolioConfig;
	const [images, setImages] = useState<IImageState[]>([
		{ data_url: initialValues.thumbnail, file: null },
	]);

	const { handleToastSuccess, handleToastError } = useCustomToast();

	const handleFormSubmit = async (values: IInitialValues) => {
		const valuesParsed = { ...values, thumbnail: images[0].data_url };
		try {
			const res = await editPortfolio(valuesParsed, portfolioId);

			/* if (!res.data.success) {
				handleToastError(res.data.message, "Portfolio");
			} else {
				handleToastSuccess(res.data.message);
				redirect("/profiles/me");
			} */
		} catch (error: any) {
			console.error(error);
			handleToastError(error.message);
		}
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: handleFormSubmit,
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<InputFields formik={formik} fields={fields} />
			<section className="flex gap-10 items-start">
				<ImageUploader images={images} setImages={setImages} maxNumber={1} />
			</section>
			<Button
				colorScheme="twitter"
				disabled={formik.isSubmitting}
				isLoading={formik.isSubmitting}
				loadingText="Editing portfolio..."
				type="submit"
			>
				Edit portfolio
			</Button>
		</form>
	);
}

interface IProps {
	initialValues: IInitialValues;
	portfolioId: string;
}

export default EditPortfolioForm;
