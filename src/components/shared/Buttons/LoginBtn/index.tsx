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
import { Props } from "./types";

export default function AuthButton({ isLoggedIn, user }: Props) {
	if (isLoggedIn && user) {
		return (
			<Menu>
				<MenuButton
					as={Button}
					rounded={"full"}
					variant={"link"}
					cursor={"pointer"}
					minW={0}
				>
					<Avatar size={"md"} src={user.image} />
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
		<Button
			bg={"white"}
			size={["sm", "md"]}
			className="flex gap-1"
			onClick={() => signIn()}
		>
			Sign In <FaUserAstronaut />
		</Button>
	);
}
