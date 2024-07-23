import { Button, Textarea, useToast } from "@chakra-ui/react";
import { FaRegStar } from "react-icons/fa";
import { useState, FormEvent } from "react";

import { Props } from "./types";
import { giveReview } from "@/services/reviews";

function RatePortfolioForm({ portfolioId, refetchReviews }: Props) {
	const toast = useToast();
	const [ratingNum, setRatingNum] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRatingNum(Number(e.target.value));
	};

	const submitForm = async (e: FormEvent) => {
		e.preventDefault();
		const comment = (e.target as any).elements.comment.value;
		const rating = ratingNum;

		const body = {
			comment,
			rating,
			portfolio_id: portfolioId,
		};

		setIsLoading(true);

		const response = giveReview(portfolioId, body);

		toast.promise(response, {
			success: (e: any) => {
				refetchReviews();
				setIsLoading(false);
				return { title: "Portfolio", description: e.message };
			},
			error: (e: any) => {
				console.error("Server error:", e);
				setIsLoading(false);
				return { title: "Portfolio", description: e.message };
			},
			loading: { title: "Portfolio", description: "Please wait" },
		});
	};

	return (
		<form onSubmit={submitForm}>
			<Textarea
				placeholder="Here is a sample placeholder"
				name="comment"
				className="mb-1"
			/>

			<input
				type="range"
				min={1}
				max={10}
				step={1}
				value={ratingNum}
				onChange={handleRateChange}
				className="range range-xs w-[100%]"
			/>

			<Button
				type="submit"
				className="flex gap-1"
				isDisabled={isLoading}
				isLoading={isLoading}
				loadingText="Sending your opinion..."
				colorScheme="blue"
			>
				Give {ratingNum} <FaRegStar />
			</Button>
		</form>
	);
}

export default RatePortfolioForm;
