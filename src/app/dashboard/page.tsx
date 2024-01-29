import { Button, Flex, Heading} from "@chakra-ui/react";
import NextLink from "next/link";

import { getAllPortfolios } from "../lib/services/portfolios.service";
import PortfolioCard from "../ui/components/Portfolio/PortfolioCard";

export default async function Home() {
	const portfolios = await getAllPortfolios();

	return (
		<>
			<Heading size="xl">Dashboard</Heading>
			<Flex mt={3} mb={8} as="section">
				<NextLink href="/dashboard/portfolios/create">
					<Button colorScheme="green" size="md">
						Create portfolio
					</Button>
				</NextLink>
			</Flex>

			<Flex gap={12} className="flex-wrap">
				{portfolios.body.map((f: any) => (
					<PortfolioCard key={f.title} portfolio={f} />
				))}
			</Flex>
		</>
	);
}
