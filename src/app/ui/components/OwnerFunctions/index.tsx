import { deletePortfolio } from "@/app/lib/services/portfolios.service";
import { Button, Flex, useToast } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Props } from "./types";

function OwnerFunctions({ id }: Props) {
	const toast = useToast();
	return (
		<Flex gap={2}>
			<NextLink href={`/dashboard/portfolios/edit/${id}`}>
				<Button size="sm">
					<FaRegEdit />
				</Button>
			</NextLink>
			<Button
				onClick={() => handleDelete(id, toast)}
				colorScheme="red"
				size="sm"
			>
				<MdDelete color="white" />
			</Button>
		</Flex>
	);
}

const handleDelete = async (id: string, toast: any) => {
	const response = deletePortfolio(id);

	toast.promise(response, {
		success: (e: any) => ({ title: "Portfolio", description: e.message }),
		error: (e: any) => {
			console.error("Server error", e);
			return { title: "Portfolio", description: e.message };
		},
		loading: { title: "Portfolio", description: "Please wait" },
	});
};

export default OwnerFunctions;
