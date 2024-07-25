import {
	Box,
	Image,
	Text,
	Badge,
	VStack,
	CircularProgress,
	CircularProgressLabel,
	Grid,
	Heading,
	Link,
	Button,
} from "@chakra-ui/react";
import { Props } from "./types";
import { getRateColor } from "@/helpers/utils";
import UserLinks from "./UserLinks";

const UserProfile = ({ data }: Props) => {
	const progressValue = (data.portfoliosAvgRating * 100) / 10;

	return (
		<Grid
			alignItems={"baseline"}
			templateColumns={{ base: "1fr", md: "auto auto" }}
			textAlign={"center"}
			justifyContent={"space-around"}
			justifyItems={"center"}
			gap={6}
		>
			<Box
				maxW="sm"
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
				p="6"
				alignItems={"center"}
				justifyContent={"center"}
			>
				<Heading>About</Heading>
				<Image
					borderRadius="full"
					boxSize="150px"
					src={data.profilePic}
					alt={`${data.githubUsername}'s profile picture`}
					mx="auto"
				/>
				<VStack spacing="4" mt="4">
					<Text fontWeight="bold" fontSize="xl">
						{data.githubUsername}
					</Text>
					<UserLinks githubUsername={data.githubUsername} email={data.email} />
				</VStack>
			</Box>

			<Box
				maxW="sm"
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
				p="6"
			>
				<Heading>Statics</Heading>
				<CircularProgress
					size={40}
					value={progressValue}
					color={`${getRateColor(data.portfoliosAvgRating)}.400`}
				>
					<CircularProgressLabel
						fontSize={20}
					>{`${data.portfoliosAvgRating}/10`}</CircularProgressLabel>
				</CircularProgress>
				<Text>
					<b>Global avg review: </b>
					{data.portfoliosAvgRating}
				</Text>
				<Text>
					<b>Total people reviewed:</b> {data.totalPeopleRated}
				</Text>
				<Text>
					<b>Total portfolios:</b> {data.portfoliosUploaded}
				</Text>
			</Box>
		</Grid>
	);
};

export default UserProfile;
