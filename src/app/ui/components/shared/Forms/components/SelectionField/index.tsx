import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Select,
} from "@chakra-ui/react";
import { Props } from "./types";

function SelectionField({
	formik,
	name,
	label,
	helperText,
	options,
	onChange,
}: Props) {
	const value = formik.values[name];
	const placeholder = options[0].label;
	const error = formik.errors[name];
	const isInvalid = error && formik.touched[name];

	return (
		<FormControl mb={4} id={name} isInvalid={isInvalid}>
			<FormLabel>{label}</FormLabel>
			<Select
				name={name}
				value={value}
				onChange={e => onChange(e.target.value)}
				placeholder={placeholder}
			>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</Select>
			<FormHelperText>{helperText}</FormHelperText>
			{error ?? <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
}

export default SelectionField;
