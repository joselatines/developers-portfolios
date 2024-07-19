import { Flex } from "@chakra-ui/react";

export default async function Home() {
	return (
		<Flex gap={12} className="flex-wrap">
			hola
			{/* {portfolios.body.map((p: Portfolio) => (
				<PortfolioCard key={p.title} portfolio={p} />
			))} */}
		</Flex>
	);
}
