import { Button, Flex, useToast } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Props } from "./types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { deletePortfolio } from "@/services/portfolios";

function OwnerFunctions({ portfolioId, authorPortfolioId }: Props) {
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const { data: session } = useSession() as any;
	const ownsThisPortfolio = session?.user?.id === authorPortfolioId;

	if (ownsThisPortfolio)
		return (
			<Flex gap={2}>
				<NextLink href={`/dashboard/portfolios/edit/${portfolioId}`}>
					<Button size="sm">
						<FaRegEdit />
					</Button>
				</NextLink>
				<Button
					onClick={() => handleDelete(portfolioId, toast, setIsLoading)}
					colorScheme="red"
					isDisabled={isLoading}
					size="sm"
				>
					<MdDelete color="white" />
				</Button>
			</Flex>
		);
}

const handleDelete = async (id: string, toast: any, setIsLoading: any) => {
	const response = deletePortfolio(id);
	setIsLoading(true);
	toast.promise(response, {
		success: (e: any) => {
			setIsLoading(false);
			return { title: "Portfolio", description: e.message };
		},
		error: (e: any) => {
			console.error("Server error", e);
			setIsLoading(false);
			return { title: "Portfolio", description: e.message };
		},
		loading: { title: "Portfolio", description: "Please wait" },
	});
};

export default OwnerFunctions;
