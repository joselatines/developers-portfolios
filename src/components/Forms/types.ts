import { ObjectSchema } from "yup";

export const FieldTypes = {
	text: "text",
	textarea: "textarea",
	selection: "selection",
} as const;

type FieldType = keyof typeof FieldTypes;

export interface SelectionOption {
	value: string;
	label: string;
}

export interface Field {
	name: string;
	label: string;
	helperText: string;
	type: FieldType;
	options?: SelectionOption[]; // in case the type is selection
}

export interface TextField extends Field {
	type: "text";
}
export interface SelectionField extends Field {
	type: "selection";
	options: SelectionOption[];
}

export interface TextareaField extends Field {
	type: "textarea";
}

export interface Config {
	getAllFields(): Field[];
	setInitialValues(newValues: Record<string, any>): void;
	getValidationSchema(): ObjectSchema<any>;
	getInitialValues(): Record<string, any>;
	getSelectionFields(): SelectionField[];
	getTextareaField(): TextareaField[];
	getTextFields(): TextField[];
}
