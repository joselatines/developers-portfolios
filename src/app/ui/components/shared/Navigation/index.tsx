import { Box, Flex, HStack, Link } from "@chakra-ui/react";

import NextLink from "next/link";
import { AuthButton } from "./AuthButton";
import { Suspense } from "react";
import Loading from "../Loading";

export default function Navigation() {
	return (
		<Box
			color={"white"}
			width={"100vw"}
			bg={"gray.900"}
			className="p-5 py-1 md:p-24 md:py-2"
		>
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<HStack spacing={8} alignItems={"center"}>
					<Box className="text-xl font-bold">
						<Link
							textDecorationLine={"none"}
							as={NextLink}
							fontSize={{ base: "sm", sm: "md" }}
							href="/"
						>
							💻 Developers Portfolios
						</Link>
					</Box>
				</HStack>
				<Flex color={"black"} alignItems={"center"}>
					<Suspense fallback={<Loading />}>
						<AuthButton />
					</Suspense>
				</Flex>
			</Flex>
		</Box>
	);
}
