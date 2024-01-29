import "./ui/globals.css";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import Navigation from "./ui/components/shared/Navigation";
import { Providers } from "./ui/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Developers Portfolios",
	description:
		"📷 Show your Dev Portfolio and receive feedback from other developers!",
	authors: [{ name: "Jose Latines", url: "https://www.joselatines.com" }],
	creator: "Jose Latines",
	generator: "Next js",
	keywords: ["portfolios", "developers portfolios", "portfolios feedback"],
	abstract: "Your abstract text goes here",
	applicationName: "Your Application Name",
	assets: "Your assets information goes here",
	category: "Your category goes here",
	classification: "Your classification goes here",
	openGraph: {
		type: "website",
		url: "https://example.com",
		title: "My Website",
		description: "My Website Description",
		siteName: "My Website",
		images: [
			{
				url: "https://example.com/og.png",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@site",
		creator: "@creator",
		images: "https://example.com/og.png",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NextTopLoader />
				<Providers>
					<Navigation />
					<main className="p-5 md:p-24">
						{/* <NavMenu /> */}
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
}
