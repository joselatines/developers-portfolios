"use client";
import { Box, Heading, Tag, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import styles from "./styles.module.css";
import { FaUser } from "react-icons/fa";
import NextImage from "next/image";
import NextLink from "next/link";
import { Props } from "./types";
import PortfolioModal from "../PortfolioModal";
import { getRateColor, getTypeColor } from "@/helpers/utils";
import OwnerFunctions from "../../OwnerFunctions";

const PortfolioCard = ({ portfolio, refreshPortfolios }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		title,
		thumbnail,
		avgRating,
		type,
		description,
		user,
		id,
		created_by,
	} = portfolio;

	const desc = description.length > 3 ? description.slice(0, 40) + "..." : "";

	return (
		<Box
			as="article"
			width={400}
			className="transition  hover:shadow-2xl hover:scale-105 p-3 rounded-lg"
		>
			<PortfolioModal isOpen={isOpen} onClose={onClose} portfolio={portfolio} />

			<Box as="section" style={{ cursor: "pointer" }} onClick={onOpen}>
				<div className={styles.imageWrapper}>
					<NextImage
						src={thumbnail}
						width={500}
						height={500}
						alt={title}
						priority={true}
						className="rounded-lg"
					/>
				</div>
			</Box>

			<section>
				<NextLink
					href={`/users/${user.id}`}
					className="opacity-95 text-sm hover:opacity-100"
				>
					{user.githubUsername}
				</NextLink>

				<Heading size={"md"}>{title}</Heading>
				<Text mt={1} mb={2} fontSize="sm">
					{desc}
				</Text>
			</section>

			<section className="flex justify-between items-center my-2">
				<section onClick={onOpen}>
					<div className="flex gap-1">
						<Tag size="sm" colorScheme={getRateColor(avgRating)}>
							{avgRating}/10
						</Tag>
						<Tag size="sm" colorScheme={getTypeColor(type)}>
							{type}
						</Tag>
						<Tag className="flex items-center gap-1">
							{portfolio.peopleRated}
							<FaUser size={12} />
						</Tag>
					</div>
				</section>
			</section>

			<OwnerFunctions
				refreshPortfolios={refreshPortfolios }
				authorPortfolioId={created_by}
				portfolioId={id}
			/>
		</Box>
	);
};

export default PortfolioCard;
