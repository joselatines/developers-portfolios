import { Heading, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default async function About() {
	return (
		<>
			<Heading>About this project</Heading>
			<Text>
				Developers Portfolios is a web application that empowers developers to
				showcase their work and receive valuable feedback from their peers. The
				platform enables users to rate and comment on each others portfolios,
				fostering a collaborative and supportive community. Users can explore
				various project categories, creating a dynamic and diverse space for
				sharing and discovery.
			</Text>
			<br />
			<Text>
				The project aims to help developers improve their visibility, receive
				constructive feedback, and secure better job opportunities.
			</Text>
			<br />
			<Text>
				Inspired by
				<Link
					as={NextLink}
					href="https://www.joselatines.com/"
					color="teal.500"
					isExternal
				>
					Jose Latines
				</Link>
				, who sought feedback on his own projects and portfolio, Devportfolios
				strives to enhance the appearance of developers work and attract
				potential clients.
			</Text>
		</>
	);
}
