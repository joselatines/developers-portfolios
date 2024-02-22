import { Box, Flex, Heading, Image, Tag, Text } from "@chakra-ui/react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import NextImage from "next/image";

import Head from "next/head";

import NotFoundError from "@/app/ui/components/shared/Errors/NotFoundError";
import { getProfile } from "@/app/lib/services/profiles.service";
import Loading from "@/app/ui/components/shared/Loading";
import { Portfolio } from "@/app/lib/types/portfolio";
import { getRateColor } from "@/app/lib/utils/ui";

const LazyPortfolioCard = dynamic(
	() => import("@/app/ui/components/Portfolio/PortfolioCard")
);

export default async function Page({ params }: { params: { id: string } }) {
	const res = await getProfile(params.id);

	if (!res.success)
		return (
			<Suspense fallback={<Loading />}>
				<NotFoundError />
			</Suspense>
		);

	const user = res.body.user;
	const portfolios = res.body.portfolios;

	const { githubUsername, email, profilePic } = user;

	return (
		<Suspense fallback={<Loading />}>
			<Head>
				<title>{githubUsername}&apos;s Portfolios</title>
			</Head>

			<Flex gap={2} mb={10} alignItems={"center"} as={"section"}>
				<Image
					src={profilePic}
					alt={githubUsername}
					borderRadius="full"
					boxSize="150px"
				/>
				<div>
					<Flex gap={1}>
						<Text fontSize="xl" fontWeight="bold">
							Global Average Rating:
						</Text>
						<Tag colorScheme={getRateColor(res.body.globalAvgRating)}>
							{res.body.globalAvgRating}/10
						</Tag>
					</Flex>

					<Text fontSize="xl" fontWeight="bold" mt={4}>
						{githubUsername}
					</Text>
					<Text color="gray.600">{email}</Text>
				</div>
			</Flex>

			<Heading mb={2}>Portfolios</Heading>
			<Flex gap={12} className="flex-wrap">
				{portfolios.map((f: Portfolio) => (
					<LazyPortfolioCard key={f.title} portfolio={f} />
				))}
			</Flex>
		</Suspense>
	);
}
