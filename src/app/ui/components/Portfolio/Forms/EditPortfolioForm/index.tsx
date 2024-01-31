"use client";
import { Button, Grid, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";

import SelectionField from "@/app/ui/components/shared/Forms/components/SelectionField";
import TextareaField from "@/app/ui/components/shared/Forms/components/TextareaField";
import ImageUploader from "@/app/ui/components/shared/Forms/components/ImageUploader";
import TextField from "@/app/ui/components/shared/Forms/components/TextField";
import { editPortfolio } from "@/app/lib/services/portfolios.service";
import { Image, Props } from "./types";
import { formConfig } from "./config";

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
		setSubmitting(true);
		const body = {
			...values,
			thumbnail: images[0].data_url,
		};

		const response = editPortfolio(id, body);

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
