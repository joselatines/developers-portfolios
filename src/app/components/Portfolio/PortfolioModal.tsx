import CommentsSection from "./Comments/CommentsSection";
import { IPortfolio } from "../../shared/interfaces/portfolio.interface";
import { Link as RouterLink } from "react-router-dom";
import { Heading, Text, Flex, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import s from "./PortfolioModal.module.css";

function PortfolioModal({ data }: IProps) {
	const { thumbnail, title, description, User, github_link, website_link, id } =
		data;

	return (
		<div className={s.container}>
			<div className={s.info}>
				<Heading as="h2" size="xl" fontWeight="bold">
					{title}
				</Heading>
				<Link as={RouterLink} fontSize={"sm"} to={`/profiles/${User.id}`}>
					@{User.githubUsername}
				</Link>
				<Text mt={5} mb={4}>
					{description}
				</Text>
				<Flex direction="column" mb={5}>
					<Flex mt={3} fontSize={"sm"} align="center" gap={5}>
						<Link href={website_link} isExternal>
							See website <ExternalLinkIcon mx="2px" />
						</Link>
						{github_link && (
							<Link href={github_link} isExternal>
								See code <ExternalLinkIcon mx="2px" />
							</Link>
						)}
					</Flex>
				</Flex>
			</div>
			<div className={s.photo}>
				<img
					className={`w-full md:col-span-2 object-contain md:h-[100%]`}
					src={thumbnail}
					alt={`Portfolio ${title} by @${User.githubUsername}`}
				/>
			</div>
			<div className={`${s.comments} mt-10`}>
				<CommentsSection portfolioId={id} />
			</div>
		</div>
	);
}

interface IProps {
	data: IPortfolio;
}

export default PortfolioModal;
