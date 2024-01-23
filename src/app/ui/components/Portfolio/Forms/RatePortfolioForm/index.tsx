import { Button, Textarea } from "@chakra-ui/react";
import { FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { Props } from "./types";

function RatePortfolioForm({ portfolioId, refreshParent }: Props) {
	const [rateNumber, setRateNumber] = useState(0);
	const [comment, setComment] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRateNumber(Number(e.target.value));
	};

	const handleGiveRateClick = async () => {
		const body = {
			comment,
			rating: rateNumber,
			portfolio_id: portfolioId,
		};
	};

	return (
		<form>
			<Textarea
				placeholder="Here is a sample placeholder"
				className="mb-1"
				onChange={e => setComment(e.target.value)}
			/>

			<section>
				<input
					type="range"
					onChange={handleRateChange}
					min={1}
					max={10}
					step={1}
					value={rateNumber}
					className="range range-xs w-[100%]"
				/>

				<Button
					onClick={handleGiveRateClick}
					className="flex gap-1"
					disabled={isLoading}
					isLoading={isLoading}
					loadingText="Sending your opinion..."
					colorScheme="whatsapp"
				>
					Give {rateNumber} <FaRegStar />
				</Button>
			</section>
		</form>
	);
}

export default RatePortfolioForm;
