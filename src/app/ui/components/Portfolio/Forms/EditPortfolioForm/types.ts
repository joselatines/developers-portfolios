import { ObjectSchema } from "yup";

export interface Props {
	initialValues: ObjectSchema<any>;
	id: string;
}

export interface Image {
	data_url: string;
}
