import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { Props } from "./types";

function TextField({ formik, name, label, helperText }: Props) {
	const error = formik.errors[name];
	const isInvalid = error && formik.touched[name];

	return (
		<FormControl id={name} isInvalid={isInvalid}>
			<FormLabel>{label}</FormLabel>
			<Input {...formik.getFieldProps(name)} type="text" />

			<FormHelperText>{helperText}</FormHelperText>
			{error ?? <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
}

export default TextField;
