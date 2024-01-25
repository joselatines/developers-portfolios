import { Flex, Heading } from "@chakra-ui/react";
import { getAllPortfolios } from "../lib/services/portfolios.service";
import PortfolioCard from "../ui/components/Portfolio/PortfolioCard";

export default async function Home() {
	const portfolios = await getAllPortfolios();

	return (
		<>
			<Heading mb={10} size="xl">
				Dashboard
			</Heading>
			<Heading size="lg">Portfolios</Heading>
			<Flex gap={12} className="flex-wrap">
				{portfolios.body.map((f: any) => (
					<PortfolioCard key={f.title} portfolio={f} />
				))}
			</Flex>
		</>
	);
}
