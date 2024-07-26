"use client";
import { Controller, useForm } from "react-hook-form";
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Button,
	Select,
	Textarea,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import { Image } from "../components/ImageUploader/types";
import ImageUploader from "../components/ImageUploader";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { useState } from "react";
import { Props } from "./types";
import { updateUser } from "@/services/users";

export default function EditUserForm({ initialValues, userId }: Props) {
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm();
	const toast = useToast();
	const { push } = useRouter();

	const [images, setImages] = useState<Image[]>([
		{ data_url: initialValues.profilePic },
	]);
	const [show, setShow] = useState(false);
	const handleShowPsw = () => setShow(!show);

	async function onSubmit(values: Partial<User>) {
		const updatedFields: any = {};
		const profilePic = images[0].data_url;

		// update profilePic
		if (values.profilePic?.includes(profilePic))
			updatedFields.profilePic = profilePic;

		// loop through current values and compare with initial values
		for (const key in values) {
			const typedKey = key as keyof Partial<User>; // Type assertion
			if (values[typedKey] !== initialValues[typedKey]) {
				updatedFields[typedKey] = values[typedKey];
			}
		}

		if (Object.keys(updatedFields).length === 0)
			return toast({
				status: "info",
				title: "No changes",
				description: "You have not made any changes ",
			});

		console.log({ updatedFields });

		toast.promise(updateUser(userId, updatedFields), {
			success: (res: any) => {
				push("/dashboard");
				return { title: "User", description: res.message };
			},
			error: (res: any) => {
				return { title: "User", description: res.message };
			},
			loading: {
				title: "User",
				description: "Updating user, please wait",
			},
		});
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* Title Field */}
			<FormControl isInvalid={!!errors.username} marginBottom="16px">
				<FormLabel htmlFor="username">Username</FormLabel>
				<Controller
					name="username"
					control={control}
					defaultValue={initialValues.username || ""}
					render={({ field: { onChange, value } }) => (
						<Input
							id="username"
							placeholder="Enter the username for your user."
							onChange={onChange}
							value={value}
						/>
					)}
				/>
				<FormErrorMessage>
					{errors.username && errors.username.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			{/* Github username Field */}
			<FormControl isInvalid={!!errors.githubUsername} marginBottom="16px">
				<FormLabel htmlFor="githubUsername">Github username</FormLabel>
				<Controller
					name="githubUsername"
					control={control}
					defaultValue={initialValues.githubUsername || ""}
					render={({ field: { onChange, value } }) => (
						<Input
							id="githubUsername"
							placeholder="Enter a brief githubUsername for your user."
							onChange={onChange}
							value={value}
						/>
					)}
				/>
				<FormErrorMessage>
					{errors.githubUsername && errors.githubUsername.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			{/* Password Field */}
			<FormControl isInvalid={!!errors.password} marginBottom="16px">
				<FormLabel htmlFor="password">Password</FormLabel>
				<Controller
					name="password"
					control={control}
					defaultValue={""}
					render={({ field: { onChange, value } }) => (
						<InputGroup size="md">
							<Input
								id="password"
								type={show ? "text" : "password"}
								placeholder="Enter the link to your user website."
								onChange={onChange}
								value={value}
							/>
							<InputRightElement width="4.5rem">
								<Button h="1.75rem" size="sm" onClick={handleShowPsw}>
									{show ? "Hide" : "Show"}
								</Button>
							</InputRightElement>
						</InputGroup>
					)}
				/>
				<FormErrorMessage>
					{errors.password && errors.password.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			{/* Email Field */}
			<FormControl isInvalid={!!errors.email} marginBottom="16px">
				<FormLabel htmlFor="email">Email</FormLabel>
				<Controller
					name="email"
					control={control}
					defaultValue={initialValues.email}
					render={({ field: { onChange, value } }) => (
						<Input
							id="email"
							placeholder="Enter the link to the repository."
							onChange={onChange}
							value={value}
						/>
					)}
				/>
				<FormErrorMessage>
					{errors.email && errors.email.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<ImageUploader
				required={true}
				images={images}
				setImages={setImages}
				maxImages={1}
			/>

			<Button mt={4} isLoading={isSubmitting} type="submit">
				Edit user
			</Button>
		</form>
	);
}
