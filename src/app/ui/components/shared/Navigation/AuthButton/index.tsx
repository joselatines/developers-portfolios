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
import { FaUserAstronaut } from "react-icons/fa";
import NextLink from "next/link";

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
					<Avatar size={"md"} src={session?.user?.image || ""} />
				</MenuButton>

				<MenuList>
					<Link as={NextLink} href="/dashboard">
						<MenuItem>Me</MenuItem>
					</Link>
					<MenuDivider />
					<MenuItem onClick={() => signOut()}>Sign out</MenuItem>
				</MenuList>
			</Menu>
		);
	}

	return (
		<Button size={["sm", "md", "lg"]} className="flex gap-1" onClick={() => signIn()}>
			Sign In <FaUserAstronaut />
		</Button>
	);
}
