"use client";
import { Button, Grid, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";

import SelectionField from "../../components/SelectionField";
import TextareaField from "../../components/TextareaField";
import ImageUploader from "../../components/ImageUploader";
import TextField from "../../components/TextField";

import { Image, Props } from "./types";
import { formConfig } from "./config";
import { updatePortfolio } from "@/services/portfolios";

const EditPortfolioForm = ({ initialValues, id }: Props) => {
	const textFields = formConfig.getTextFields();
	const selectionFields = formConfig.getSelectionFields();
	const textareaFields = formConfig.getTextareaField();
	const { push } = useRouter();

	const { thumbnail } = initialValues as any;
	const [submitting, setSubmitting] = useState(false);
	const [images, setImages] = useState<Image[]>([{ data_url: thumbnail }]);
	const toast = useToast();

	// Set initial values for the form
	formConfig.setInitialValues(initialValues);
	const initialValuesParsed = formConfig.getInitialValues();

	const formik = useFormik({
		initialValues: initialValuesParsed,
		validationSchema: formConfig.getValidationSchema(),
		onSubmit: async values => await submitForm(values, id, images),
	});

	const submitForm = async (values: any, id: string, images: Image[]) => {
		const toastTitle = "Portfolio";

		const loadingToast = toast({
			status: "loading",
			title: toastTitle,
			description: "Updating portfolio, please wait",
			duration: null,
		});
		setSubmitting(true);
		const body = {
			...values,
			thumbnail: images[0].data_url,
		};

		console.log({ values, body });
		const res = await updatePortfolio(id, body);

		if (!res.success)
			toast({
				status: "error",
				title: toastTitle,
				description: res.message,
			});
		else {
			toast({
				status: "success",
				title: toastTitle,
				description: res.message,
			});
			push("/dashboard");
		}
		toast.close(loadingToast);
		setSubmitting(false);
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid gap={5}>
				{textFields.map(field => (
					<TextField key={field.name} formik={formik} {...field} />
				))}

				{textareaFields.map(field => (
					<TextareaField key={field.name} formik={formik} {...field} />
				))}

				{selectionFields.map(field => (
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
				Edit portfolio
			</Button>
		</form>
	);
};

export default EditPortfolioForm;
