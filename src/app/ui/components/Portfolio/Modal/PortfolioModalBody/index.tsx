import { Button, Flex, Link, Tag, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import NextImage from "next/image";

import CommentsSection from "@/app/ui/components/Comments/CommentsSection";
import { Props } from "./types";
import { getRateColor, getTypeColor } from "@/app/lib/utils/ui";

function PortfolioModalBody({ portfolio }: Props) {
	const {
		avgRating,
		thumbnail,
		type,
		file_name,
		description,
		github_link,
		website_link,
		id,
		User,
	} = portfolio;

	return (
		<>
			<Flex gap={1} marginBottom={2}>
				<Tag size="md" colorScheme={getRateColor(avgRating)}>
					{avgRating}/10
				</Tag>
				<Tag size="md" colorScheme={getTypeColor(type)}>
					{type}
				</Tag>
			</Flex>

			<NextImage
				width={500}
				height={500}
				className={`w-full md:col-span-2 object-contain md:h-[100%]`}
				src={thumbnail}
				alt={file_name + "portfolio"}
			/>

			<Flex justifyContent="space-between" marginY={2}>
				<Link as={NextLink} href={`/profiles/${User.id}`}>
					Created by JoseLatines
				</Link>

				<Flex gap={5}>
					{!github_link ?? (
						<NextLink href={github_link} target="_blank">
							<Button variant="ghost" size="md">
								<Text marginRight={1}>Code</Text> <FaGithub />
							</Button>
						</NextLink>
					)}

					<NextLink href={website_link} target="_blank">
						<Button variant="ghost" size="md">
							<Text marginRight={1}>Live</Text> <FaExternalLinkAlt />
						</Button>
					</NextLink>
				</Flex>
			</Flex>

			<Text mt={3} mb={6}>{description}</Text>

			<CommentsSection portfolioId={id} />
		</>
	);
}

export default PortfolioModalBody;
