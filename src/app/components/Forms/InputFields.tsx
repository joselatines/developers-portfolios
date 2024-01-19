import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Select,
	Textarea,
} from "@chakra-ui/react";

interface FieldOption {
	value: string;
	label: string;
}

export interface FormField {
	name: string;
	label: string;
	helperText: string;
	type: "text" | "textarea" | "select" | string;
	options?: FieldOption[];
}

interface InputFieldsProps {
	formik: any; // Replace with the actual formik type
	fields: FormField[];
}

// Component to render a set of input fields based on the provided configuration
function InputFields({ formik, fields }: InputFieldsProps) {
	return (
		<>
			{fields.map(field => (
				<FormControl
					key={field.name}
					isInvalid={Boolean(formik.errors[field.name])}
					marginBottom={5}
				>
					<FormLabel htmlFor={field.name}>{field.label}</FormLabel>

					{getFieldInput(field, formik)}

					{!formik.errors[field.name] ? (
						<FormHelperText>{field.helperText}</FormHelperText>
					) : (
						<FormErrorMessage>{formik.errors[field.name]}</FormErrorMessage>
					)}
				</FormControl>
			))}
		</>
	);
}

// Helper function to render the appropriate input field based on field type
function getFieldInput(field: FormField, formik: any) {
	if (field.type === "select" && field.options) {
		return (
			<Select
				id={field.name}
				name={field.name}
				onChange={formik.handleChange}
				value={formik.values[field.name]}
				width="auto"
			>
				{field.options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</Select>
		);
	} else if (field.type === "textarea") {
		return (
			<Textarea
				id={field.name}
				name={field.name}
				onChange={formik.handleChange}
				value={formik.values[field.name]}
				width="auto"
			/>
		);
	} else {
		return (
			<Input
				id={field.name}
				name={field.name}
				type={field.type}
				onChange={formik.handleChange}
				value={formik.values[field.name]}
				width="auto"
			/>
		);
	}
}

export default InputFields;
