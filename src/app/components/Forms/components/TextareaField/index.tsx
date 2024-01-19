import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Textarea,
} from "@chakra-ui/react";
import { Props } from "./types";

function TextareaField({ formik, name, label, helperText }: Props) {
	const error = formik.errors[name];
	return (
		<FormControl id={name} isInvalid={error && formik.touched[name]}>
			<FormLabel>{label}</FormLabel>
			<Textarea {...formik.getFieldProps(name)} type="textarea" />

			<FormHelperText>{helperText}</FormHelperText>
			{error ?? <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
}

export default TextareaField;
