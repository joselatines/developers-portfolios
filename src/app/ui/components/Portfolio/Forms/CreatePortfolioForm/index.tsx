import { useFormik } from "formik";
import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import TextareaField from "@/app/ui/components/shared/Forms/components/TextareaField";
import TextField from "@/app/ui/components/shared/Forms/components/TextField";
import { formConfig } from "./config";
import SelectionField from "@/app/ui/components/shared/Forms/components/SelectionField";
import ImageUploader from "@/app/ui/components/shared/Forms/components/ImageUploader";
import { createPortfolio } from "@/app/lib/services/portfolios.service";
import { Field, SelectionField as ISelectionField } from "../../../shared/Forms/types";

const initialValues = formConfig.getInitialValues();
const validationSchema = formConfig.getValidationSchema();
const textFields = formConfig.getTextFields();
const selectionFields = formConfig.getSelectionFields();
const textareaFields = formConfig.getTextareaField();

const submitForm = async (
	values: any,
	images: { data_url: string }[],
	toast: any
) => {
	const body = {
		...values,
		thumbnail: images[0].data_url,
	};

	const response = createPortfolio(body);

	toast.promise(response, {
		success: (e: any) => {
			return { title: "Portfolio", description: e.message };
		},
		error: (e: any) => {
			console.error("Server error", e);
			return { title: "Portfolio", description: e.message };
		},
		loading: { title: "Portfolio", description: "Please wait" },
	});
};

function CreatePortfolioForm() {
	const [images, setImages] = useState<{ data_url: string }[]>([]);
	const toast = useToast();

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async values => submitForm(values, images, toast),
	});

	return (
		<form onSubmit={formik.handleSubmit}>
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
			<Button
				disabled={formik.isSubmitting}
				isLoading={formik.isSubmitting}
				type="submit"
			>
				Create
			</Button>
		</form>
	);
}

export default CreatePortfolioForm;
