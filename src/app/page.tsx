import { getServerSession } from "next-auth";
import { getAllPortfolios } from "./lib/services/portfolios.service";
import PortfolioCard from "./ui/components/Portfolio/PortfolioCard";
import { Portfolio } from "./lib/types/portfolio";
import { Flex } from "@chakra-ui/react";
import NotLoggedInError from "./ui/components/shared/Errors/NotFoundError";

export default async function Home() {
	const session = await getServerSession();
	const portfolios = await getAllPortfolios();

	const mockPortfolios: Portfolio[] = [
		{
			thumbnail: "/photo.png",
			created_by: "1",
			website_link: "https://portfolio1.com",
			type: "fullstack",
			title: "Portfolio 1",
			description:
				"As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme. As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme. As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme.",
			id: "1",
			file_name: "fdf",
			avgRating: 100,
			github_link: "https://portfolio1.com",
			User: {
				id: "user_1",
				githubUsername: "john_doe",
				email: "john.doe@example.com",
				profilePic: "/user.svg",
				provider: "github",
			},
		},
		{
			thumbnail: "/photo.png",
			created_by: "2",
			website_link: "https://portfolio20.com",
			type: "fullstack",
			title: "Portfolio 20",
			github_link: "https://portfolio1.com",
			description:
				"As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme.",
			id: "20",
			file_name: "sdfsdf",
			avgRating: 100,
			User: {
				id: "user_1",
				githubUsername: "john_doe",
				email: "john.doe@example.com",
				profilePic: "/user.svg",
				provider: "github",
			},
		},
		{
			thumbnail: "/photo.png",
			created_by: "1",
			website_link: "https://portfolio1.com",
			type: "fullstack",
			title: "Portfolio 1",
			description:
				"As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme. As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme. As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme.",
			id: "1",
			file_name: "fdf",
			avgRating: 100,
			github_link: "https://portfolio1.com",
			User: {
				id: "user_1",
				githubUsername: "john_doe",
				email: "john.doe@example.com",
				profilePic: "/user.svg",
				provider: "github",
			},
		},
		{
			thumbnail: "/photo.png",
			created_by: "2",
			website_link: "https://portfolio20.com",
			type: "fullstack",
			title: "Portfolio 20",
			github_link: "https://portfolio1.com",
			description:
				"As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme.",
			id: "20",
			file_name: "sdfsdf",
			avgRating: 100,
			User: {
				id: "user_1",
				githubUsername: "john_doe",
				email: "john.doe@example.com",
				profilePic: "/user.svg",
				provider: "github",
			},
		},
		{
			thumbnail: "/photo.png",
			created_by: "1",
			website_link: "https://portfolio1.com",
			type: "fullstack",
			title: "Portfolio 1",
			description:
				"As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme. As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme. As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme.",
			id: "1",
			file_name: "fdf",
			avgRating: 100,
			github_link: "https://portfolio1.com",
			User: {
				id: "user_1",
				githubUsername: "john_doe",
				email: "john.doe@example.com",
				profilePic: "/user.svg",
				provider: "github",
			},
		},
		{
			thumbnail: "/photo.png",
			created_by: "2",
			website_link: "https://portfolio20.com",
			type: "fullstack",
			title: "Portfolio 20",
			github_link: "https://portfolio1.com",
			description:
				"As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme.",
			id: "20",
			file_name: "sdfsdf",
			avgRating: 100,
			User: {
				id: "user_1",
				githubUsername: "john_doe",
				email: "john.doe@example.com",
				profilePic: "/user.svg",
				provider: "github",
			},
		},
		{
			thumbnail: "/photo.png",
			created_by: "1",
			website_link: "https://portfolio1.com",
			type: "fullstack",
			title: "Portfolio 1",
			description:
				"As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme. As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme. As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme.",
			id: "1",
			file_name: "fdf",
			avgRating: 100,
			github_link: "https://portfolio1.com",
			User: {
				id: "user_1",
				githubUsername: "john_doe",
				email: "john.doe@example.com",
				profilePic: "/user.svg",
				provider: "github",
			},
		},
		{
			thumbnail: "/photo.png",
			created_by: "2",
			website_link: "https://portfolio20.com",
			type: "fullstack",
			title: "Portfolio 20",
			github_link: "https://portfolio1.com",
			description:
				"As of v2.4.2 there is now the addition of ChakraBaseProvider. This is a minimal version of ChakraProvider that only supplies theme tokens and not the default component theming. One of the biggest causes of the large initial JS payload is the size of the component themes. With the following approach, you get to apply the default themes for just the components you need by using extendBaseTheme.",
			id: "20",
			file_name: "sdfsdf",
			avgRating: 100,
			User: {
				id: "user_1",
				githubUsername: "john_doe",
				email: "john.doe@example.com",
				profilePic: "/user.svg",
				provider: "github",
			},
		},
	];

	if (session)
		return (
			<Flex gap={12} className="flex-wrap">
				{portfolios.body.map((f: any) => (
					<PortfolioCard key={f.title} portfolio={f} />
				))}
			</Flex>
		);

	return <NotLoggedInError />;
}
