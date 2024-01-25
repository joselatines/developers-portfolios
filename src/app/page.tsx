import { getServerSession } from "next-auth";
import { getAllPortfolios } from "./lib/services/portfolios.service";
import PortfolioCard from "./ui/components/Portfolio/PortfolioCard";
import { Flex } from "@chakra-ui/react";

export default async function Home() {
	const session = await getServerSession();
	const portfolios = await getAllPortfolios();

	return (
		<Flex gap={12} className="flex-wrap">
			{portfolios.body.map((f: any) => (
				<PortfolioCard key={f.title} portfolio={f} />
			))}
		</Flex>
	);
}
