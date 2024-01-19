import { useEffect, useContext } from "react";
import {
	Box,
	Flex,
	Avatar,
	HStack,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Link,
	useToast,
} from "@chakra-ui/react";
import RouterLink from "next/link";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { redirect } from "next/navigation";

export default function Navigation() {
	const { user, setUser, setToken } = useContext(AuthContext);
	const toast = useToast();

	const handleLogout = () => {
		setUser(null);
		setToken(null);
		redirect("/");
	};

	useEffect(() => {
		toast({
			title: "Warning",
			status: "warning",
			description:
				"This website is currently on a free plan, so it may take longer to load on the first visit.",
			isClosable: true,
			colorScheme: "orange",
		});
	}, []);

	return (
		<Box
			position={"fixed"}
			color={"white"}
			width={"100vw"}
			bg={"gray.900"}
			px={10}
			zIndex={1000}
		>
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<HStack spacing={8} alignItems={"center"}>
					<Box className="text-xl font-bold">
						<RouterLink href="/">
							<Link
								textDecorationLine={"none"}
								as={RouterLink}
								fontSize={{ base: "sm", sm: "md" }}
							>
								Developers Portfolio
							</Link>
						</RouterLink>
					</Box>
				</HStack>
				<Flex color={"black"} alignItems={"center"}>
					{user ? (
						<ProfileMenu handleLogout={handleLogout} user={user} />
					) : (
						<AnonymousMenu />
					)}
				</Flex>
			</Flex>
		</Box>
	);
}

function ProfileMenu({ handleLogout, user }: any) {
	return (
		<Menu>
			<MenuButton
				as={Button}
				rounded={"full"}
				variant={"link"}
				cursor={"pointer"}
				minW={0}
			>
				<Avatar size={"sm"} src={user.profilePic} />
			</MenuButton>

			<MenuList>
				<RouterLink href="/profiles/me">
					<Link>
						<MenuItem>Me</MenuItem>
					</Link>
				</RouterLink>

				<MenuDivider />
				<MenuItem onClick={handleLogout}>Log out</MenuItem>
			</MenuList>
		</Menu>
	);
}

function AnonymousMenu() {
	return (
		<Flex alignItems={"center"} gap={3}>
			<Menu>
				<RouterLink href="/auth/login">
					<Link>
						<Button size={{ base: "sm", md: "md" }}>Login</Button>
					</Link>
				</RouterLink>

				<RouterLink href="/auth/signup">
					<Link>
						<Button size={{ base: "sm", sm: "md" }}>Sign up</Button>
					</Link>
				</RouterLink>
			</Menu>
		</Flex>
	);
}
