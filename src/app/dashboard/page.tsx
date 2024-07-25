import PortfolioSection from "@/components/Portfolio/PortfolioSection";
import { authConfig } from "@/lib/auth";
import { getPortfolios } from "@/services/portfolios";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import NextLink from "next/link";

export default async function Dashboard() {
	const session = (await getServerSession(authConfig)) as any;

	const res = await getPortfolios({ authorId: session.user.id });
	const portfolios = res.data;
	return (
		<>
			<Heading size="xl">Welcome to your Dashboard!</Heading>
			<Flex mt={3} mb={8} as="section">
				<NextLink href="/dashboard/portfolios/create">
					<Button colorScheme="green" size="md">
						Create portfolio
					</Button>
				</NextLink>
			</Flex>
			<PortfolioSection userId={session.user.id} />
		</>
	);
}
