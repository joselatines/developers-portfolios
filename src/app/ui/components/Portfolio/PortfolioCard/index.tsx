"use client";
import { Box, Tag, Text } from "@chakra-ui/react";
import { getRateColor, getTypeColor } from "@/app/lib/utils/ui";
import NextImage from "next/image";
import NextLink from "next/link";
import { useDisclosure } from "@chakra-ui/react";
import OwnerFunctions from "@/app/ui/components/OwnerFunctions";
import { Props } from "./types";
import PortfolioModal from "../Modal";

function PortfolioCard({ portfolio }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { title, thumbnail, avgRating, type, description } = portfolio;

	return (
		<Box onClick={onOpen}>
			<PortfolioModal isOpen={isOpen} onClose={onClose} portfolio={portfolio} />

			<Box pos="relative">
				<h4 className="font-medium text-lg">{title}</h4>
				<NextImage src={thumbnail} width={300} height={500} alt={title} />
				<NextLink
					target="_blank"
					href={`/profiles/{User.id}`}
					className="opacity-95 text-sm"
				>
					{/* {portfolioOwnerName} */}
				</NextLink>
			</Box>

			<Text as="sub" fontSize="sm">
				{description.slice(0, 40)}...
			</Text>

			<section className="flex justify-between items-center my-2">
				<div className="flex gap-1">
					<Tag size="sm" colorScheme={getRateColor(avgRating)}>
						{avgRating}/10
					</Tag>
					<Tag size="sm" colorScheme={getTypeColor(type)}>
						{type}
					</Tag>
				</div>
				<OwnerFunctions />
			</section>
		</Box>
	);
}

export default PortfolioCard;
