import { FormikValues } from "formik";
import { Field, SelectionOption } from "../../types";

export interface Props extends Field {
	formik: FormikValues;
	options: SelectionOption[];
	onChange(value: any): void;
}
