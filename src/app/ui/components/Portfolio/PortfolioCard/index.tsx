"use client"
import { Box, Heading, Tag, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";

import PortfolioModal from "@/app/ui/components/Portfolio/Modal";
import { getRateColor, getTypeColor } from "@/app/lib/utils/ui";
import OwnerFunctions from "@/app/ui/components/OwnerFunctions";
import styles from "./styles.module.css";
import { Props } from "./types";

const PortfolioCard = ({ portfolio }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { title, thumbnail, avgRating, type, description, id, User } =
		portfolio;

	return (
		<Box as="article">
			<PortfolioModal isOpen={isOpen} onClose={onClose} portfolio={portfolio} />

			<Box style={{ cursor: "pointer" }} onClick={onOpen} as="section">
				<div className={styles.imageWrapper}>
					<NextImage
						src={thumbnail}
						width={500}
						height={500}
						alt={title}
						priority={true}
					/>
				</div>

				<NextLink href={`/profiles/${User.id}`} className="opacity-95 text-sm">
					{User.githubUsername}
				</NextLink>

				<Heading mt={3} size={"md"}>
					{title}
				</Heading>
				<Text as="sub" fontSize="sm">
					{description.slice(0, 40)}...
				</Text>
			</Box>

			<section className="flex justify-between items-center my-2">
				<section onClick={onOpen}>
					<div className="flex gap-1">
						<Tag size="sm" colorScheme={getRateColor(avgRating)}>
							{avgRating}/10
						</Tag>
						<Tag size="sm" colorScheme={getTypeColor(type)}>
							{type}
						</Tag>
					</div>
				</section>
			</section>

			<OwnerFunctions id={id} userEmail={User.email} />
		</Box>
	);
};

export default PortfolioCard;
