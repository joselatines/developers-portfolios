import { Button, Textarea, Box } from "@chakra-ui/react";
import { AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import { createRatingToPortfolio } from "../../services/ratings.service";
import useCustomToast from "../../hooks/useCustomToast";

interface IProps {
	portfolioId: string;
	refreshParent: () => void;
}

function RatePortfolioForm({ portfolioId, refreshParent }: IProps) {
	const { handleToastSuccess, handleToastError } = useCustomToast();
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

		try {
			setIsLoading(true);
			const res = await createRatingToPortfolio(body);

			if (!res.data.success) {
				handleToastError(res.data.message, "Feedback Portfolio");
				setIsLoading(false);
				return;
			}

			handleToastSuccess(res.data.message, "Feedback Portfolio");
			refreshParent();
		} catch (error: any) {
			handleToastError(error.message);
      console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form className="grid">
			<Box as="span" className="text-lg font-bold mb-2">
				Give a comment
			</Box>
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
					className="grid items-center"
					disabled={isLoading}
					isLoading={isLoading}
					loadingText="Sending your opinion..."
					colorScheme="whatsapp"
				>
					Give {rateNumber} <AiOutlineStar />
				</Button>
			</section>
		</form>
	);
}

export default RatePortfolioForm;
