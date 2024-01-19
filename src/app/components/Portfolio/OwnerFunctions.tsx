import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deletePortfolio } from "../../services/portfolios.service";
import useCustomToast from "../../hooks/useCustomToast";

function OwnerFunctions({ portfolioId }: { portfolioId: string }) {
	const { handleToastSuccess, handleToastError } = useCustomToast();
	// const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleDelete = async (portfolioId: string) => {
		try {
			setIsLoading(true);
			const res = await deletePortfolio(portfolioId);
			if (!res.data.success) {
				setIsLoading(false);
				return handleToastError(res.data.message, "Portfolio");
			}

			handleToastSuccess(res.data.message, "Portfolio");
			location.reload();
		} catch (error: any) {
			handleToastError(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="flex gap-3 justify-end">
			<Link to={`/profiles/me/portfolios/edit/${portfolioId}`}>
				<Button size="sm">
					<FaRegEdit />
				</Button>
			</Link>
			<Button
				colorScheme="red"
				size="sm"
				disabled={isLoading}
				isLoading={isLoading}
				loadingText="Deleting portfolio..."
				onClick={() => handleDelete(portfolioId)}
			>
				<MdDelete color="white" />
			</Button>
		</div>
	);
}

export default OwnerFunctions;
