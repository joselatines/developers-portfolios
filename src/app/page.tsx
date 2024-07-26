import { getPortfolios } from "@/services/portfolios";
import { Flex } from "@chakra-ui/react";
import PortfolioCard from "@/components/Portfolio/PortfolioCard";
import { Portfolio } from "@/types/portfolio";

export default async function Home() {
	const res = await getPortfolios({});

	if (!res.success) return <p>{res.message}</p>;
	if (res.data.length === 0) return <p>There is no portfolios</p>;

	return (
		<Flex as={"section"} gap={12} flexWrap={"wrap"}>
			{res.data.map((p: Portfolio) => (
				<PortfolioCard key={p.createdAt} portfolio={p} />
			))}
		</Flex>
	);
}
