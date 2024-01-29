import { Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import { API_URL } from "@/app/lib/services/config";
import { Portfolio } from "./lib/types/portfolio";


const LazyPortfolioCard = dynamic(
	() => import("./ui/components/Portfolio/PortfolioCard")
);

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
				<LazyPortfolioCard key={f.title} portfolio={f} />
			))}
		</Flex>
	);
}
