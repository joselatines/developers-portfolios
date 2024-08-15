import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import NextLink from "next/link";
import { Button, Link, Text } from "@chakra-ui/react";

function UserLinks({
	githubUsername,
	email,
}: {
	githubUsername: string | undefined;
	email: string | undefined;
}) {
	return (
		<>
			<Link
				as={NextLink}
				href={`https://github.com/${githubUsername}`}
				isExternal
			>
				<Button size="md">
					<Text marginRight={1}>Github</Text>
					<FaGithub />
				</Button>
			</Link>
			<Link as={NextLink} href={`mailto:${email}`} isExternal>
				<Button size="md">
					<Text marginRight={1}>Gmail</Text>
					<MdEmail />
				</Button>
			</Link>
		</>
	);
}

export default UserLinks;
