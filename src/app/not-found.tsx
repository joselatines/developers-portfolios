import { Button } from "@chakra-ui/react";
import NextLink from "next/link";

export default function NotFound() {
	return (
		<div className="text-3xl">
			<h2>Are you lost? 😕</h2>
			<p>Don&apos;t worry go back to the home page</p>

			<NextLink href="/">
				<Button>Return Home</Button>
			</NextLink>
		</div>
	);
}
