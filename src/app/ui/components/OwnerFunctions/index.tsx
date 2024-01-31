import { deletePortfolio } from "@/app/lib/services/portfolios.service";
import { Button, Flex, useToast } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Props } from "./types";
import { useSession } from "next-auth/react";
import { useState } from "react";

function OwnerFunctions({ id, userEmail }: Props) {
	const toast = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const { data: session } = useSession();

	const ownsThisPortfolio = session?.user?.email === userEmail;

	if (ownsThisPortfolio)
		return (
			<Flex gap={2}>
				<NextLink href={`/dashboard/portfolios/edit/${id}`}>
					<Button size="sm">
						<FaRegEdit />
					</Button>
				</NextLink>
				<Button
					onClick={() => handleDelete(id, toast, setIsLoading)}
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
