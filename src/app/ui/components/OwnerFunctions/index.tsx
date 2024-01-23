import { Button, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function OwnerFunctions() {
	return (
		<Flex gap={2}>
			<NextLink href={`/dashboard/portfolios/edit/{portfolioId}`}>
				<Button size="sm">
					<FaRegEdit />
				</Button>
			</NextLink>
			<Button colorScheme="red" size="sm">
				<MdDelete color="white" />
			</Button>
		</Flex>
	);
}

export default OwnerFunctions;
