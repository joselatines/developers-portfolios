import {
	Button,
	Flex,
	Grid,
	GridItem,
	Link,
	Tag,
	Text,
} from "@chakra-ui/react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import NextLink from "next/link";
import NextImage from "next/image";
import styles from "./styles.module.css";
import { getRateColor, getTypeColor } from "@/helpers/utils";
import CommentsSection from "@/components/Comment/CommentsSection";
import { PortfolioModalBodyProps } from "../types";

function PortfolioModalBody({ portfolio }: PortfolioModalBodyProps) {
	const {
		avgRating,
		thumbnail,
		type,
		file_name,
		description,
		github_link,
		website_link,
		id,
		user,
		peopleRated,
	} = portfolio;

	return (
		<>
			<Flex gap={1} marginBottom={2}>
				<Tag colorScheme={getRateColor(avgRating)}>{avgRating}/10</Tag>
				<Tag colorScheme={getTypeColor(type)}>{type}</Tag>
				<Tag>Rated by {peopleRated} developers</Tag>
			</Flex>

			<div className={styles.imageWrapper}>
				<NextImage
					width={1000}
					height={1000}
					/* 	className={`w-full md:col-span-2 object-contain md:h-[100%]`} */
					src={thumbnail}
					alt={file_name + "portfolio"}
				/>
			</div>

			<Grid
				templateColumns="repeat(2, 1fr)"
				alignItems={"center"}
				justifyContent="space-between"
				marginY={2}
			>
				<GridItem w="100%">
					<Link as={NextLink} href={`/users/${user.id}`}>
						Created by {user.username}
					</Link>
				</GridItem>

				<GridItem w="100%">
					<Flex justifyContent={"right"} gap={5}>
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
				</GridItem>
			</Grid>

			<Text mt={3} mb={6}>
				{description}
			</Text>

			<Flex gap={1} marginBottom={2}>
				<Tag colorScheme={getRateColor(avgRating)}>{avgRating}/10</Tag>
				<Tag colorScheme={getTypeColor(type)}>{type}</Tag>
				<Tag>Rated by {peopleRated} developers</Tag>
			</Flex>

			<CommentsSection portfolioId={id} />
		</>
	);
}

export default PortfolioModalBody;
