"use client";
import { Portfolio } from "@/types/portfolio";
import PortfolioCard from "../PortfolioCard";
import { Flex, Heading } from "@chakra-ui/react";
import { getPortfolios } from "@/services/portfolios";
import { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";

export default function PortfolioSection({
	userId,
	title = "Portfolios",
}: {
	userId?: string | undefined;
	title?: string;
}) {
	const [portfolios, setPortfolios] = useState({ loading: true, data: [] });
	const [refresh, setRefresh] = useState(0);

	useEffect(() => {
		async function fetchData() {
			const filters: any = {};
			if (userId) filters.authorId = userId;

			const res = await getPortfolios(filters);
			const data = res.data;
			setPortfolios({ loading: false, data });
		}

		fetchData();
	}, [refresh]);

	// todo add skeleton
	if (portfolios.loading) return <Loader />;

	if (portfolios.data.length === 0)
		return <h1>There is no portfolios to show</h1>;
	return (
		<>
			{title && <Heading>{title}</Heading>}

			<Flex as={"section"} gap={12} flexWrap={"wrap"}>
				{portfolios.data.map((p: Portfolio) => (
					<PortfolioCard
						key={p.createdAt}
						portfolio={p}
						refreshPortfolios={() => setRefresh(prev => prev + 1)}
					/>
				))}
			</Flex>
		</>
	);
}
