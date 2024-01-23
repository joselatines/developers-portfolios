import { AnyObject, ObjectSchema } from "yup";
import {
	Config,
	Field,
	FieldTypes,
	SelectionField,
	TextField,
	TextareaField,
} from "./types";

export class FormConfig implements Config {
	constructor(
		private fields: Field[],
		private validationSchema: ObjectSchema<any>,
		private initialValues: Record<string, any> // Specify the type for initialValues
	) {}
	getAllFields(): Field[] {
		return this.fields;
	}
	getValidationSchema(): ObjectSchema<any, AnyObject, any, ""> {
		return this.validationSchema;
	}
	getInitialValues(): Record<string, any> {
		return this.initialValues;
	}
	getTextFields(): TextField[] {
		const selectionFields = this.fields.filter(
			field => field.type === FieldTypes.text
		);

		return selectionFields as TextField[];
	}
	getSelectionFields(): SelectionField[] {
		const selectionFields = this.fields.filter(
			field => field.type === FieldTypes.selection
		);
		return selectionFields as SelectionField[];
	}
	getTextareaField(): TextareaField[] {
		const selectionFields = this.fields.filter(
			field => field.type === FieldTypes.textarea
		);
		return selectionFields as TextareaField[];
	}
}
