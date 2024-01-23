"use client";
import { Box, Tag } from "@chakra-ui/react";
import { getRateColor, getTypeColor } from "@/app/lib/utils/ui";
import NextImage from "next/image";
import NextLink from "next/link";
import { useDisclosure } from "@chakra-ui/react";
import OwnerFunctions from "@/app/ui/components/OwnerFunctions";
import { Props } from "./types";
import PortfolioModal from "../Modal";

function PortfolioCard({ portfolio }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<article onClick={onOpen} className="max-w-md w-96 overflow-hidden">
			<PortfolioModal isOpen={isOpen} onClose={onClose} portfolio={portfolio} />

			<Box pos="relative">
				<h4 className="font-medium text-lg">{portfolio.title}</h4>
				<NextImage
					src={portfolio.thumbnail}
					width={300}
					height={500}
					alt={portfolio.title}
				/>
				<NextLink
					target="_blank"
					href={`/profiles/{portfolio.User.id}`}
					className="opacity-95 text-sm"
				>
					{/* {portfolio.portfolioOwnerName} */}
				</NextLink>
			</Box>

			<span>{portfolio.description.slice(0, 30)}</span>

			<section className="flex justify-between items-center my-2">
				<div className="flex gap-1">
					<Tag size="sm" colorScheme={getRateColor(portfolio.avgRating)}>
						{portfolio.avgRating}/10
					</Tag>
					<Tag size="sm" colorScheme={getTypeColor(portfolio.type)}>
						{portfolio.type}
					</Tag>
				</div>
				<OwnerFunctions />
			</section>
		</article>
	);
}

export default PortfolioCard;
