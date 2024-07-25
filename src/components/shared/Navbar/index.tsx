"use client";

import {
	Box,
	Flex,
	HStack,
	IconButton,
	useDisclosure,
	useColorModeValue,
	Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "./Navlink";
import NextLink from "next/link";
import AuthButton from "../Buttons/LoginBtn";
import { Props } from "./types";
import { useSession } from "next-auth/react";

export default function Navbar({ defaultLinks, loggedLinks }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data: session } = useSession();

	const links = session ? defaultLinks.concat(loggedLinks) : defaultLinks;

	return (
		<>
			<Box
				borderRadius={"lg"}
				as="header"
				bg={useColorModeValue("gray.100", "gray.900")}
				zIndex={100}
				w={"90vw"}
				px={4}
			>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<Box as="h2" fontSize={{ sm: 16, md: 32 }} fontWeight={"bold"}>
							<NextLink href="/">Devportfolios</NextLink>
						</Box>
						<HStack
							as={"nav"}
							spacing={4}
							display={{ base: "none", md: "flex" }}
						>
							{links.map(link => (
								<NavLink href={link.href} key={link.href}>
									{link.name}
								</NavLink>
							))}
						</HStack>
					</HStack>
					<Flex alignItems={"center"}>
						<AuthButton
							isLoggedIn={Boolean(session)}
							user={session?.user as any}
						/>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"ul"} spacing={4}>
							{links.map(link => (
								<li key={link.href}>
									<NavLink href={link.href}>{link.name}</NavLink>
								</li>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>

			{/* <Box p={4}>Main Content Here</Box> */}
		</>
	);
}
