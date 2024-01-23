"use client";
import { getRateColor, getTypeColor } from "@/app/lib/utils/ui";
import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Tag,
	useDisclosure,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";

import PortfolioModalBody from "../PortfolioModalBody";
import { useRef } from "react";
import { Props } from "./types";
import OwnerFunctions from "../../OwnerFunctions";

function PortfolioCard({ portfolio }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef(null);

	const { title, thumbnail, type, avgRating, description } = portfolio;

	return (
		<article onClick={onOpen} className="max-w-md w-96 overflow-hidden">
			<Modal
				onClose={onClose}
				finalFocusRef={btnRef}
				isOpen={isOpen}
				scrollBehavior={"inside"}
				size={"xl"}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<PortfolioModalBody portfolio={portfolio} />
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Box pos="relative">
				<h4 className="font-medium text-lg">{title}</h4>

				<NextImage src={thumbnail} width={300} height={500} alt={title} />
				<NextLink
					target="_blank"
					href={`/profiles/{User.id}`}
					className="opacity-95 text-sm"
				>
					{"portfolioOwnerName"}
				</NextLink>
			</Box>

			<span>{description.slice(0, 30)}</span>

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
		</article>
	);
}

export default PortfolioCard;
