import { Button, Grid, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";

import SelectionField from "@/app/ui/components/shared/Forms/components/SelectionField";
import TextareaField from "@/app/ui/components/shared/Forms/components/TextareaField";
import ImageUploader from "@/app/ui/components/shared/Forms/components/ImageUploader";
import TextField from "@/app/ui/components/shared/Forms/components/TextField";
import { createPortfolio } from "@/app/lib/services/portfolios.service";
import { formConfig } from "./config";
import {
	Field,
	SelectionField as ISelectionField,
} from "../../../shared/Forms/types";
import { Image } from "./types";

function CreatePortfolioForm() {
	const { push } = useRouter();
	const initialValues = formConfig.getInitialValues();
	const validationSchema = formConfig.getValidationSchema();
	const textFields = formConfig.getTextFields();
	const selectionFields = formConfig.getSelectionFields();
	const textareaFields = formConfig.getTextareaField();

	const [images, setImages] = useState<Image[]>([]);
	const toast = useToast();

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async values => await submitForm(values, images),
	});

	const submitForm = async (values: any, images: { data_url: string }[]) => {
		formik.setSubmitting(true);
		const body = {
			...values,
			thumbnail: images[0].data_url,
		};

		const response = createPortfolio(body);

		toast.promise(response, {
			success: (e: any) => {
				push("/dashboard");
				return { title: "Portfolio", description: e.message };
			},
			error: (e: any) => {
				console.error("Server error", e);
				return { title: "Portfolio", description: e.message };
			},
			loading: { title: "Portfolio", description: "Please wait" },
		});
		formik.setSubmitting(false);
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid gap={5}>
				{textFields.map((field: Field) => (
					<TextField key={field.name} formik={formik} {...field} />
				))}

				{textareaFields.map((field: Field) => (
					<TextareaField key={field.name} formik={formik} {...field} />
				))}

				{selectionFields.map((field: ISelectionField) => (
					<SelectionField
						key={field.name}
						formik={formik}
						onChange={value => formik.setFieldValue(field.name, value)}
						{...field}
					/>
				))}

				<ImageUploader images={images} setImages={setImages} maxImages={1} />
			</Grid>
			<Button
				isDisabled={formik.isSubmitting}
				isLoading={formik.isSubmitting}
				type="submit"
				colorScheme="blue"
				loadingText="Submitting"
				spinnerPlacement="start"
			>
				Create portfolio
			</Button>
		</form>
	);
}

export default CreatePortfolioForm;
