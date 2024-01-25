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
	return (
		<FormControl id={name} isInvalid={error && formik.touched[name]}>
			<FormLabel>{label}</FormLabel>
			<Input {...formik.getFieldProps(name)} type="text" />

			<FormHelperText>{helperText}</FormHelperText>
			{error ?? <FormErrorMessage color='tomato'>{error}</FormErrorMessage>}
		</FormControl>
	);
}

export default TextField;
