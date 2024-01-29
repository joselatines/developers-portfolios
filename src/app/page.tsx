import { getAllPortfolios } from "./lib/services/portfolios.service";
import PortfolioCard from "./ui/components/Portfolio/PortfolioCard";
import { Flex } from "@chakra-ui/react";
import { Portfolio } from "./lib/types/portfolio";

export default async function Home() {
	const portfolios = await getAllPortfolios();

	return (
		<Flex gap={12} className="flex-wrap">
			{portfolios.body.map((f: Portfolio) => (
				<PortfolioCard key={f.title} portfolio={f} />
			))}
		</Flex>
	);
}
