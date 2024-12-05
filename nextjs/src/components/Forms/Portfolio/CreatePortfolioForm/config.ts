import * as Yup from "yup";
import { Field } from "../../types";
import { FormConfig } from "../..";

const initialValues = {
	thumbnail: "",
	website_link: "",
	github_link: "",
	type: "",
	title: "",
	description: "",
};

const validationSchema = Yup.object({
	title: Yup.string().required("Title is required"),
	description: Yup.string(),
	website_link: Yup.string()
		.url("Invalid URL")
		.required("Website Link is required"),
	github_link: Yup.string().url("Invalid URL"),
	type: Yup.string().required("Type is required"),
});

const fields: Field[] = [
	{
		name: "title",
		label: "Title",
		helperText: "Enter the title for your portfolio.",
		type: "text",
	},
	{
		name: "description",
		label: "Description",
		helperText: "Enter a brief description for your portfolio.",
		type: "textarea",
	},
	{
		name: "website_link",
		label: "Website Link",
		helperText: "Enter the link to your portfolio website.",
		type: "text",
	},
	{
		name: "github_link",
		label: "Github Link",
		helperText: "Enter the link to the repository.",
		type: "text",
	},
	{
		name: "type",
		label: "Type",
		helperText: "Select the type of your portfolio.",
		type: "selection",
		options: [
			{ value: "", label: "Select type" },
			{ value: "backend", label: "Backend" },
			{ value: "frontend", label: "Frontend" },
			{ value: "fullstack", label: "Fullstack" },
			{ value: "mobile", label: "Mobile" },
			{ value: "software", label: "Software" },
		],
	},
];

export const formConfig = new FormConfig(
	fields,
	validationSchema,
	initialValues
);
