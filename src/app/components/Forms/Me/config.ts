import * as Yup from "yup";

export const formikConfig = {
	validationSchema: Yup.object({
		githubUsername: Yup.string(),
		profilePic: Yup.string(),
	}),

	fields: [
		{
			name: "githubUsername",
			label: "Github username",
			helperText: "Enter your GITHUB username",
			type: "githubUsername",
		},
		{
			name: "profilePic",
			label: "Profile pic link",
			helperText: "Enter your profile pic (link to the image)",
			type: "text",
		},
	],
};
