import { Button, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaBook, FaGithub } from "react-icons/fa";

export default function Footer() {
	return (
		<Flex
			as={"footer"}
      position={"absolute"}
      bottom={"0px"}
      left={"0px"}
      w="100%"
			color={"white"}
			bg={"gray.900"}
			className="p-5 py-6 md:p-24 md:py-10 "
			alignItems={"center"}
			justifyContent={["center", "space-between"]}
			gap={5}
			flexWrap={"wrap"}
		>
			<section className="grid gap-3">
				<NextLink
					href={"https://github.com/joselatines/developers-portfolios"}
					target="_blank"
				>
					{/* <Button bg={"white"} size={["sm", "md"]} className="flex gap-1">
						Github Repository <FaGithub />
					</Button> */}
				</NextLink>
				<NextLink href={"/about"}>
					<Button bg={"white"} size={["sm", "md"]} className="flex gap-1">
						About this project <FaBook />
					</Button>
				</NextLink>
			</section>
			<span>
				Made with ❤️ by{" "}
				<NextLink href={"https://www.joselatines.com"} target="_blank">
					Jose Latines
				</NextLink>
			</span>
		</Flex>
	);
}
