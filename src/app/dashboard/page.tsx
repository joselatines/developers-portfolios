"use client";
import { Button, Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";

import { getAllPortfolios } from "../lib/services/portfolios.service";
import PortfolioCard from "../ui/components/Portfolio/PortfolioCard";
import NotLoggedIn from "../ui/components/shared/Errors/NotLoggedIn";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Portfolio } from "../lib/types/portfolio";
import Loading from "../ui/components/shared/Loading";

export default function Home() {
	const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();

	const makeRequest = async () => {
		try {
			setLoading(true);
			const res = await getAllPortfolios({
				userEmail: session?.user?.email as string,
			});

			setPortfolios(res.body);
		} catch (error) {
			setPortfolios([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		makeRequest();
	}, []);

	if (!session) return <NotLoggedIn />;

	console.log({ portfolios });

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

			{loading ? (
				<Loading />
			) : (
				<Flex gap={12} className="flex-wrap">
					{portfolios.map((f: Portfolio) => (
						<PortfolioCard key={f.title} portfolio={f} />
					))}
				</Flex>
			)}
		</>
	);
}
