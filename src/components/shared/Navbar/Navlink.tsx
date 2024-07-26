import { Link, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

export function NavLink({ children, href, target }: Props) {
	return (
		<Link
			as={NextLink}
			href={href}
			px={2}
			py={1}
			rounded={"md"}
			_hover={{
				textDecoration: "none",
				bg: useColorModeValue("blue.400", "blue.700"),
			}}
		>
			{children}
		</Link>
	);
}

interface Props {
	children: React.ReactNode;
	href: string;
	target?: string;
}
