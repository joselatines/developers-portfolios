import TextareaField from "@/app/components/Forms/components/TextareaField";
import TextField from "../../../Forms/components/TextField";
import { formConfig } from "./config";
import { useFormik } from "formik";
import SelectionField from "@/app/components/Forms/components/SelectionField";
import { Button } from "@chakra-ui/react";

const initialValues = formConfig.getInitialValues();
const validationSchema = formConfig.getValidationSchema();
const textFields = formConfig.getTextFields();
const selectionFields = formConfig.getSelectionFields();
const textareaFields = formConfig.getTextareaField();

function CreatePortfolioForm() {
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async values => {
			console.table(values);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
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
			<Button type="submit">Create</Button>
		</form>
	);
}

export default CreatePortfolioForm;
