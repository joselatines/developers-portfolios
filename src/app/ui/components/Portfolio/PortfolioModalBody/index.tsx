import { Button, Flex, Tag, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import NextImage from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

import CommentsSection from "@/app/ui/components/Comments/CommentsSection";
import OwnerFunctions from "@/app/ui/components/OwnerFunctions";
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
				alt={file_name}
			/>

			<Flex justifyContent="space-between" marginY={2}>
				<NextLink href={`/profiles/{User.id}`}>Created by JoseLatines</NextLink>

				<Flex gap={5}>
					{!github_link && (
						<NextLink href={github_link} target="_blank">
							<Button variant="ghost" size="xs">
								Code <FaGithub />
							</Button>
						</NextLink>
					)}

					<NextLink href={website_link} target="_blank">
						<Button variant="ghost" size="xs">
							Live <FaExternalLinkAlt />
						</Button>
					</NextLink>
				</Flex>
			</Flex>

			<Text marginY={3}>{description}</Text>

			<CommentsSection />
		</>
	);
}

export default PortfolioModalBody;