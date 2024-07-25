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
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUploader from "../../components/ImageUploader";
import { Props } from "./types";
import { updatePortfolio } from "@/services/portfolios";
import { Portfolio } from "@/types/portfolio";
import { Image } from "../../components/ImageUploader/types";

export default function EditPortfolioForm({
	initialValues,
	portfolioId,
}: Props) {
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm();
	const toast = useToast();
	const { push } = useRouter();

	const [images, setImages] = useState<Image[]>([
		{ data_url: initialValues.thumbnail },
	]);

	async function onSubmit(values: Partial<Portfolio>) {
		const updatedFields: any = {};
		const thumbnail = images[0].data_url;

		// update thumbnail
		if (values.thumbnail?.includes(thumbnail))
			updatedFields.thumbnail = thumbnail;

		// loop through current values and compare with initial values
		for (const key in values) {
			const typedKey = key as keyof Partial<Portfolio>; // Type assertion
			if (values[typedKey] !== initialValues[typedKey]) {
				updatedFields[typedKey] = values[typedKey];
			}
		}

		if (Object.keys(updatedFields).length === 0)
			return toast({
				status: "info",
				title: "No changes",
				description: "You have not made any changes to your portfolio",
			});

		toast.promise(updatePortfolio(portfolioId, updatedFields), {
			success: (res: any) => {
				push("/dashboard");
				return { title: "Portfolio", description: res.message };
			},
			error: (res: any) => {
				return { title: "Portfolio", description: res.message };
			},
			loading: {
				title: "Portfolio",
				description: "Updating portfolio, please wait",
			},
		});
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* Title Field */}
			<FormControl isInvalid={!!errors.title} marginBottom="16px">
				<FormLabel htmlFor="title">Title</FormLabel>
				<Controller
					name="title"
					control={control}
					defaultValue={initialValues.title}
					rules={{ required: "This is required" }}
					render={({ field: { onChange, value } }) => (
						<Input
							id="title"
							placeholder="Enter the title for your portfolio."
							onChange={onChange}
							value={value}
						/>
					)}
				/>
				<FormErrorMessage>
					{errors.title && errors.title.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			{/* Description Field */}
			<FormControl isInvalid={!!errors.description} marginBottom="16px">
				<FormLabel htmlFor="description">Description</FormLabel>
				<Controller
					name="description"
					control={control}
					defaultValue={initialValues?.description}
					rules={{ required: "This is required" }}
					render={({ field: { onChange, value } }) => (
						<Textarea
							id="description"
							placeholder="Enter a brief description for your portfolio."
							onChange={onChange}
							value={value}
						/>
					)}
				/>
				<FormErrorMessage>
					{errors.description && errors.description.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			{/* Website Link Field */}
			<FormControl isInvalid={!!errors.website_link} marginBottom="16px">
				<FormLabel htmlFor="website_link">Website Link</FormLabel>
				<Controller
					name="website_link"
					control={control}
					defaultValue={initialValues.website_link}
					rules={{ required: "This is required" }}
					render={({ field: { onChange, value } }) => (
						<Input
							id="website_link"
							placeholder="Enter the link to your portfolio website."
							onChange={onChange}
							value={value}
						/>
					)}
				/>
				<FormErrorMessage>
					{errors.website_link && errors.website_link.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			{/* Github Link Field */}
			<FormControl isInvalid={!!errors.github_link} marginBottom="16px">
				<FormLabel htmlFor="github_link">Github Link</FormLabel>
				<Controller
					name="github_link"
					control={control}
					defaultValue={initialValues?.github_link}
					rules={{ required: "This is required" }}
					render={({ field: { onChange, value } }) => (
						<Input
							id="github_link"
							placeholder="Enter the link to the repository."
							onChange={onChange}
							value={value}
						/>
					)}
				/>
				<FormErrorMessage>
					{errors.github_link && errors.github_link.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			{/* Type Field */}
			<FormControl isInvalid={!!errors.type} marginBottom="16px">
				<FormLabel htmlFor="type">Type</FormLabel>
				<Controller
					name="type"
					control={control}
					defaultValue={initialValues?.type}
					rules={{ required: "This is required" }}
					render={({ field: { onChange, value } }) => (
						<Select
							id="type"
							placeholder="Select the type of your portfolio."
							onChange={onChange}
							value={value}
						>
							<option value="fullstack">Fullstack</option>
							<option value="backend">Backend</option>
							<option value="frontend">Frontend</option>
							<option value="mobile">Mobile</option>
							<option value="software">Software</option>
						</Select>
					)}
				/>
				<FormErrorMessage>
					{errors.type && errors.type.message?.toString()}
				</FormErrorMessage>
			</FormControl>

			<ImageUploader
				required={true}
				images={images}
				setImages={setImages}
				maxImages={1}
			/>

			<Button mt={4} isLoading={isSubmitting} type="submit">
				Submit
			</Button>
		</form>
	);
}
