import { Portfolio } from "@/types/portfolio";
import PortfolioCard from "../PortfolioCard";
import { Flex } from "@chakra-ui/react";

export default function PortfolioSection({
	portfolios,
}: {
	portfolios: Portfolio[];
}) {
	if (portfolios.length === 0) return <h1>There is no portfolios to show</h1>;
	return (
		<Flex as={"section"} gap={12} flexWrap={"wrap"}>
			{portfolios.map((p: Portfolio) => (
				<PortfolioCard key={p.title} portfolio={p} />
			))}
		</Flex>
	);
}
