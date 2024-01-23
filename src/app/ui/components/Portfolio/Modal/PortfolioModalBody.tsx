import { Box, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import NextImage from "next/image";

function PortfolioModalBody({ title, thumbnail, description }: any) {
	return (
		<>
			<NextImage
				width={500}
				height={500}
				className={`w-full md:col-span-2 object-contain md:h-[100%]`}
				src={thumbnail}
				alt={`Portfolio ${title} by @`}
			/>

			<Flex justifyContent='space-between' marginTop={2}>
				<NextLink href={`/profiles/{User.id}`}>Created by JoseLatines</NextLink>

				<Flex gap={5}>
					<Text>Code</Text>
					<Text>Live</Text>
				</Flex>
			</Flex>

			<Box as="section" marginTop={5}>
				<Text>{description}</Text>
				<Flex direction="column" mb={5}>
					<Flex mt={3} fontSize={"sm"} align="center" gap={5}>
						<NextLink href={"website_NextLink"}>
							{/* See website <ExternalNextLinkIcon mx="2px" /> */}
						</NextLink>
						{/* {github_NextLink && (
							<NextLink href={github_NextLink} isExternal>
								See code <ExternalNextLinkIcon mx="2px" />
							</NextLink>
						)} */}
					</Flex>
				</Flex>
			</Box>

			<div>{/* <CommentsSection portfolioId={id} /> */}</div>
		</>
	);
}

export default PortfolioModalBody;
