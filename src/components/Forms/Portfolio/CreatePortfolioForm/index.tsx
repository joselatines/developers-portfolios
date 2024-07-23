"use client";
import { Button, Grid, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";

import SelectionField from "@/components/Forms/components/SelectionField";
import TextareaField from "@/components/Forms/components/TextareaField";
import ImageUploader from "@/components/Forms/components/ImageUploader";
import TextField from "@/components/Forms/components/TextField";

import { formConfig } from "./config";
import {
	Field,
	SelectionField as ISelectionField,
} from "@/components/Forms/types";
import { Image } from "./types";
import { createPortfolio } from "@/services/portfolios";

function CreatePortfolioForm() {
	const { push } = useRouter();
	const initialValues = formConfig.getInitialValues();
	const validationSchema = formConfig.getValidationSchema();
	const textFields = formConfig.getTextFields();
	const selectionFields = formConfig.getSelectionFields();
	const textareaFields = formConfig.getTextareaField();

	const [submitting, setSubmitting] = useState(false);
	const [images, setImages] = useState<Image[]>([]);
	const toast = useToast();

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async values => await submitForm(values, images),
	});

	const submitForm = async (values: any, images: { data_url: string }[]) => {
		setSubmitting(true);
		const body = {
			...values,
			thumbnail: images[0].data_url,
		};

		const response = createPortfolio(body);

		toast.promise(response, {
			success: (e: any) => {
				push("/dashboard");
				setSubmitting(false);
				return { title: "Portfolio", description: e.message };
			},
			error: (e: any) => {
				console.error("Server error", e);
				setSubmitting(false);
				return { title: "Portfolio", description: e.message };
			},
			loading: { title: "Portfolio", description: "Please wait" },
		});
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
				isDisabled={submitting}
				isLoading={submitting}
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
