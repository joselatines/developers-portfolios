"use client";

import {
	Avatar,
	Button,
	Menu,
	MenuButton,
	MenuList,
	Link,
	MenuItem,
	MenuDivider,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { FaGithub } from "react-icons/fa";

// TODO: refactor this component to be amenu not a button
export function AuthButton() {
	const { data: session } = useSession();

	if (session) {
		return (
			<Menu>
				<MenuButton
					as={Button}
					rounded={"full"}
					variant={"link"}
					cursor={"pointer"}
					minW={0}
				>
					<Avatar size={"sm"} src={session?.user?.image || ""} />
				</MenuButton>

				<MenuList>
					<Link as={NextLink} href="/dashboard">
						<MenuItem>Me</MenuItem>
					</Link>
					<Link as={NextLink} href="/dashboard/portfolios/create">
						<MenuItem>Create portfolio</MenuItem>
					</Link>
					<MenuDivider />
					<MenuItem onClick={() => signOut()}>Sign out</MenuItem>
				</MenuList>
			</Menu>
		);
	}

	return (
		<Button className="flex gap-1" onClick={() => signIn()}>
			Sign In <FaGithub />
		</Button>
	);
}
