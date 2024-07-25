import { Button, Flex, useToast } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Props } from "./types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { deletePortfolio } from "@/services/portfolios";
import { useRouter } from "next/navigation";

function OwnerFunctions({
	portfolioId,
	authorPortfolioId,
	refreshPortfolios,
}: Props) {
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const { push } = useRouter();
	const { data: session } = useSession() as any;
	const ownsThisPortfolio = session?.user?.id === authorPortfolioId;

	const handleDelete = async (id: string) => {
		setIsLoading(true);
		toast.promise(deletePortfolio(id), {
			success: (e: any) => {
				refreshPortfolios && refreshPortfolios();
				return { title: "Portfolio", description: e.message };
			},
			error: (e: any) => {
				return { title: "Portfolio", description: e.message };
			},
			loading: { title: "Portfolio", description: "Please wait" },
		});

		setIsLoading(false);
	};

	if (ownsThisPortfolio)
		return (
			<Flex gap={2}>
				<NextLink href={`/dashboard/portfolios/edit/${portfolioId}`}>
					<Button size="sm">
						<FaRegEdit />
					</Button>
				</NextLink>
				<Button
					onClick={() => handleDelete(portfolioId)}
					colorScheme="red"
					isDisabled={isLoading}
					size="sm"
				>
					<MdDelete color="white" />
				</Button>
			</Flex>
		);
}

export default OwnerFunctions;
