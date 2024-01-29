import { Flex } from "@chakra-ui/react";
import { Portfolio } from "./lib/types/portfolio";
import PortfolioCard from "./ui/components/Portfolio/PortfolioCard";
import { API_URL } from "@/app/lib/services/config";

export async function getAllPortfolios() {
	const res = await fetch(`${API_URL}/portfolios`, { cache: "no-store" });

	const data = await res.json();
	if (!data.success) throw new Error(data.message);

	return data;
}

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
