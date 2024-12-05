import { FormikValues } from "formik";
import { Field } from "../../types";

export interface Props extends Field {
	formik: FormikValues;
}
