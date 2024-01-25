"use client";
import { Box, Heading, Tag, Text } from "@chakra-ui/react";
import { getRateColor, getTypeColor } from "@/app/lib/utils/ui";
import NextImage from "next/image";
import NextLink from "next/link";
import { useDisclosure } from "@chakra-ui/react";
import OwnerFunctions from "@/app/ui/components/OwnerFunctions";
import { Props } from "./types";
import PortfolioModal from "../Modal";

function PortfolioCard({ portfolio }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { title, thumbnail, avgRating, type, description, id } = portfolio;

	return (
		<Box>
			<PortfolioModal isOpen={isOpen} onClose={onClose} portfolio={portfolio} />

			<Box style={{ cursor: "pointer" }} onClick={onOpen} as="section">
				<NextImage
					src={thumbnail}
					/* layout="responsive" */
					width={400}
					height={400}
					alt={title}
				/>
				<NextLink
					target="_blank"
					href={`/profiles/{User.id}`}
					className="opacity-95 text-sm"
				>
					{/* {portfolioOwnerName} */}
				</NextLink>

				<Heading size={"md"}>{title}</Heading>
				<Text as="sub" fontSize="sm">
					{description.slice(0, 40)}...
				</Text>
			</Box>

			<section
				onClick={onOpen}
				className="flex justify-between items-center my-2"
			>
				<div className="flex gap-1">
					<Tag size="sm" colorScheme={getRateColor(avgRating)}>
						{avgRating}/10
					</Tag>
					<Tag size="sm" colorScheme={getTypeColor(type)}>
						{type}
					</Tag>
				</div>
			</section>

			<OwnerFunctions id={id} />
		</Box>
	);
}

export default PortfolioCard;
